export async function setupDirectory() {
  const dirHandle: never[] = await (window as any).showDirectoryPicker();
  if (!dirHandle) {
    return;
  }

  const result = [];
  for await (const value of dirHandle) {
    result.push(value);
  }

  const container = document.getElementById("dirlist");
  const entries = (await result).sort();

  if (container && entries.length > 0) {
    container.innerHTML = "";
    document.querySelector<HTMLButtonElement>("#export")!.disabled = false;
  }

  for await (let entry of entries as any) {
    entry = entry[1];
    if (
      entry.kind === "file" &&
      (entry.name.endsWith(".jpg") || entry.name.endsWith(".jpeg"))
    ) {
      const link = document.createElement("button");
      const linkAttributes = {
        id: entry.name,
        class: "dirlist__file",
        href: "javascript:;",
        "data-entry": entry,
        "data-name": entry.name,
        "data-kind": entry.kind,
      };
      for (const [key, val] of Object.entries(linkAttributes)) {
        link.setAttribute(key, val);
      }
      link.innerHTML = entry.name;
      container?.appendChild(link);
      link.addEventListener("click", function () {
        setupView(entry);
        removeCurrentFile();
        this.setAttribute("class", "dirlist__currentFile");
      });
    }
  }
}

function removeCurrentFile() {
  const curFile = document.querySelector<HTMLElement>(".dirlist__currentFile");
  if (curFile) {
    curFile.setAttribute("class", "dirlist__file");
  }
}

async function setupView(entry: FileSystemFileHandle) {
  document.getElementById("app__right__content")!.style.display = "none";

  const file = await entry.getFile();

  let quadPoints: Point[] = [];
  let nearbyPoint: number = -1;
  let initialPoint = {};
  let id = entry.name;

  const viewArea = <Element>document.getElementById("app__right__view");

  viewArea.innerHTML = `<div id="app__right__view__controls" class="bottom_controls"></div><canvas id="app__right__view__canvas__image"></canvas><canvas id="app__right__view__canvas__quad"></canvas>`;

  // set up bottom bar with preview button
  document.querySelector<HTMLDivElement>(
    "#app__right__view__controls"
  )!.innerHTML = `
  <button id='preview' type='button'>Preview</button>
  <div class="spacer"></div>
  <button id='nleft' type='button'>◀</button>
  <button id='nup' type='button'>▲</button>
  <button id='ndown' type='button'>▼</button>
  <button id='nright' type='button'>▶</button>
  <div class="spacer"></div>
  <button id='prev' type='button'>Previous</button>
  <button id='next' type='button'>Next</button>`;
  document.querySelector<HTMLButtonElement>("#preview")!.disabled = true;
  nudgePointsButtons(false);
  document
    .querySelector<HTMLButtonElement>("#preview")!
    .addEventListener("click", () => preview(file));
  document
    .querySelector<HTMLButtonElement>("#prev")!
    .addEventListener("click", () => prevFile());
  document
    .querySelector<HTMLButtonElement>("#next")!
    .addEventListener("click", () => nextFile());
  document
    .querySelector<HTMLButtonElement>("#nup")!
    .addEventListener("click", () =>
      nudgePoint("Up", imageDims, id, quadPoints, ctxQuad, nearbyPoint)
    );
  document
    .querySelector<HTMLButtonElement>("#ndown")!
    .addEventListener("click", () =>
      nudgePoint("Down", imageDims, id, quadPoints, ctxQuad, nearbyPoint)
    );
  document
    .querySelector<HTMLButtonElement>("#nleft")!
    .addEventListener("click", () =>
      nudgePoint("Left", imageDims, id, quadPoints, ctxQuad, nearbyPoint)
    );
  document
    .querySelector<HTMLButtonElement>("#nright")!
    .addEventListener("click", () =>
      nudgePoint("Right", imageDims, id, quadPoints, ctxQuad, nearbyPoint)
    );

  const canvasImage = <HTMLCanvasElement>(
    document.getElementById("app__right__view__canvas__image")
  );
  const canvasQuad = <HTMLCanvasElement>(
    document.getElementById("app__right__view__canvas__quad")
  );
  const ctxImage = <CanvasRenderingContext2D>canvasImage.getContext("2d");
  const ctxQuad = <CanvasRenderingContext2D>canvasQuad.getContext("2d");
  const imageObj = new Image();
  const imageDimsOriginal: Dimensions = { width: -1, height: -1 };
  const imageDims: Dimensions = { width: -1, height: 800 };
  imageObj.onload = function () {
    imageDimsOriginal.width = imageObj.width;
    imageDimsOriginal.height = imageObj.height;
    const ratio = imageDims.height / imageObj.height;
    imageDims.width = imageObj.width * ratio;
    canvasImage?.setAttribute("width", imageDims.width.toString());
    canvasQuad?.setAttribute("width", imageDims.width.toString());
    canvasImage?.setAttribute("height", imageDims.height.toString());
    canvasQuad?.setAttribute("height", imageDims.height.toString());
    canvasImage?.setAttribute("data-name", id);
    ctxImage.imageSmoothingQuality = "high";
    ctxImage.drawImage(imageObj, 0, 0, imageDims.width, imageDims.height);
    const anyExistingQuadPoints = GetQuadPointsFromLocalStorage(id);
    if (anyExistingQuadPoints && anyExistingQuadPoints.length == 4) {
      quadPoints = anyExistingQuadPoints;
      drawRect(imageDims, quadPoints, ctxQuad, -1);
      document.querySelector<HTMLButtonElement>("#preview")!.disabled = false;
    }
  };
  imageObj.src = URL.createObjectURL(file);

  canvasQuad.addEventListener(
    "mouseup",
    function (e) {
      movePoint(imageDims, quadPoints, e, initialPoint, nearbyPoint);
      nearbyPoint = draw(imageDims, quadPoints, ctxQuad, e, nearbyPoint);
      nudgePointsButtons(nearbyPoint > -1);
      SaveQuadPointsToLocalStorage(id, quadPoints);
    },
    false
  );
  canvasQuad.addEventListener(
    "mousedown",
    function (e) {
      [{ nearbyPoint, initialPoint }] = dragPoints(imageDims, quadPoints, e);
      nudgePointsButtons(nearbyPoint > -1);
    },
    false
  );
}

interface Dimensions {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

function draw(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  e: MouseEvent,
  activePoint: number
) {
  if (quadPoints && quadPoints.length < 4) {
    let point: Point = {
      x: e.offsetX / imageDims.width,
      y: e.offsetY / imageDims.height,
    };
    quadPoints.push(point);
    activePoint = quadPoints.indexOf(point);

    drawNodes(imageDims, quadPoints, ctx, activePoint);
    if (quadPoints.length == 4) {
      organizeQuadPoints(quadPoints);
      document.querySelector<HTMLButtonElement>("#preview")!.disabled = false;
    }
  }
  if (quadPoints.length == 4) {
    drawNodes(imageDims, quadPoints, ctx, activePoint);
    drawRect(imageDims, quadPoints, ctx, activePoint);
  }
  return activePoint;
}

function drawNodes(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  activeNode: number
) {
  ctx.clearRect(0, 0, imageDims.width, imageDims.height);

  for (let i = 0; i < quadPoints.length; i++) {
    if (i == activeNode) {
      ctx.fillStyle = "rgb(0 255 0 / 80%)";
    } else {
      ctx.fillStyle = "rgb(255 0 0 / 40%)";
    }
    ctx.fillRect(
      quadPoints[i].x * imageDims.width - 4,
      quadPoints[i].y * imageDims.height - 4,
      8,
      8
    );
  }
}

function drawRect(
  imageDims: Dimensions,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  activeNode: number
) {
  ctx.clearRect(0, 0, imageDims.width, imageDims.height);

  drawNodes(imageDims, quadPoints, ctx, activeNode);

  let region = new Path2D();

  // draw boundary
  region.moveTo(
    quadPoints[0].x * imageDims.width,
    quadPoints[0].y * imageDims.height
  );
  for (let i of [1, 2, 3]) {
    region.lineTo(
      quadPoints[i].x * imageDims.width,
      quadPoints[i].y * imageDims.height
    );
  }
  region.closePath();

  //set up line drawing
  ctx.strokeStyle = "rgb(255 0 0 / 80%)";
  ctx.lineWidth = 1;

  // draw vertical half
  ctx.beginPath();
  ctx.moveTo(
    ((quadPoints[0].x + quadPoints[1].x) / 2) * imageDims.width,
    ((quadPoints[0].y + quadPoints[1].y) / 2) * imageDims.height
  );
  ctx.lineTo(
    ((quadPoints[2].x + quadPoints[3].x) / 2) * imageDims.width,
    ((quadPoints[2].y + quadPoints[3].y) / 2) * imageDims.height
  );
  ctx.stroke();

  // draw horizontal half
  ctx.beginPath();
  ctx.moveTo(
    ((quadPoints[0].x + quadPoints[3].x) / 2) * imageDims.width,
    ((quadPoints[0].y + quadPoints[3].y) / 2) * imageDims.height
  );
  ctx.lineTo(
    ((quadPoints[2].x + quadPoints[1].x) / 2) * imageDims.width,
    ((quadPoints[2].y + quadPoints[1].y) / 2) * imageDims.height
  );
  ctx.stroke();

  // draw vertical thirds
  ctx.beginPath();
  ctx.moveTo(
    ((quadPoints[1].x - quadPoints[0].x) / 3 + quadPoints[0].x) *
      imageDims.width,
    ((quadPoints[1].y - quadPoints[0].y) / 3 + quadPoints[0].y) *
      imageDims.height
  );
  ctx.lineTo(
    ((quadPoints[2].x - quadPoints[3].x) / 3 + quadPoints[3].x) *
      imageDims.width,
    ((quadPoints[2].y - quadPoints[3].y) / 3 + quadPoints[3].y) *
      imageDims.height
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    (((quadPoints[1].x - quadPoints[0].x) * 2) / 3 + quadPoints[0].x) *
      imageDims.width,
    (((quadPoints[1].y - quadPoints[0].y) * 2) / 3 + quadPoints[0].y) *
      imageDims.height
  );
  ctx.lineTo(
    (((quadPoints[2].x - quadPoints[3].x) * 2) / 3 + quadPoints[3].x) *
      imageDims.width,
    (((quadPoints[2].y - quadPoints[3].y) * 2) / 3 + quadPoints[3].y) *
      imageDims.height
  );
  ctx.stroke();

  // draw horizontal thirds
  ctx.beginPath();
  ctx.moveTo(
    ((quadPoints[3].x - quadPoints[0].x) / 3 + quadPoints[0].x) *
      imageDims.width,
    ((quadPoints[3].y - quadPoints[0].y) / 3 + quadPoints[0].y) *
      imageDims.height
  );
  ctx.lineTo(
    ((quadPoints[2].x - quadPoints[1].x) / 3 + quadPoints[1].x) *
      imageDims.width,
    ((quadPoints[2].y - quadPoints[1].y) / 3 + quadPoints[1].y) *
      imageDims.height
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    (((quadPoints[3].x - quadPoints[0].x) * 2) / 3 + quadPoints[0].x) *
      imageDims.width,
    (((quadPoints[3].y - quadPoints[0].y) * 2) / 3 + quadPoints[0].y) *
      imageDims.height
  );
  ctx.lineTo(
    (((quadPoints[2].x - quadPoints[1].x) * 2) / 3 + quadPoints[1].x) *
      imageDims.width,
    (((quadPoints[2].y - quadPoints[1].y) * 2) / 3 + quadPoints[1].y) *
      imageDims.height
  );
  ctx.stroke();

  // draw diagonals
  // ctx.beginPath();
  // ctx.moveTo(
  //   quadPoints[0].x * imageDims.width,
  //   quadPoints[0].y * imageDims.height
  // );
  // ctx.lineTo(
  //   quadPoints[2].x * imageDims.width,
  //   quadPoints[2].y * imageDims.height
  // );
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(
  //   quadPoints[1].x * imageDims.width,
  //   quadPoints[1].y * imageDims.height
  // );
  // ctx.lineTo(
  //   quadPoints[3].x * imageDims.width,
  //   quadPoints[3].y * imageDims.height
  // );
  // ctx.stroke();

  ctx.fillStyle = "rgb(255 0 0 / 20%)";
  ctx.fill(region);
  ctx.stroke(region);
}

function organizeQuadPoints(quadPoints: Point[]) {
  // set quad points in order of top-left, top-right, bottom-right, then bottom-left

  // find center point
  quadPoints.sort((a, b) => b.x - a.x);
  const cx = (quadPoints[0].x + quadPoints[quadPoints.length - 1].x) / 2;
  quadPoints.sort((a, b) => a.y - b.y);
  const cy = (quadPoints[0].y + quadPoints[quadPoints.length - 1].y) / 2;
  const center: Point = { x: cx, y: cy };

  // organize by center
  let topLeft: Point = { x: 0, y: 0 };
  let topRight: Point = { x: 0, y: 0 };
  let bottomRight: Point = { x: 0, y: 0 };
  let bottomLeft: Point = { x: 0, y: 0 };

  let quadPoint: Point;
  for (let s of quadPoints) {
    quadPoint = s as any;

    if (quadPoint.x < center.x && quadPoint.y < center.y) {
      topLeft = quadPoint;
    } else if (quadPoint.x < center.x && quadPoint.y > center.y) {
      bottomLeft = quadPoint;
    } else if (quadPoint.x > center.x && quadPoint.y < center.y) {
      topRight = quadPoint;
    } else if (quadPoint.x > center.x && quadPoint.y > center.y) {
      bottomRight = quadPoint;
    }
  }

  quadPoints[0] = topLeft;
  quadPoints[1] = topRight;
  quadPoints[2] = bottomRight;
  quadPoints[3] = bottomLeft;
}

function dragPoints(imageDims: Dimensions, quadPoints: Point[], e: MouseEvent) {
  let closestPoint = -1;
  if (quadPoints && quadPoints.length == 4) {
    const pad = 16;
    for (let i of [0, 1, 2, 3]) {
      if (
        e.offsetX > quadPoints[i].x * imageDims.width - pad &&
        e.offsetX < quadPoints[i].x * imageDims.width + pad
      ) {
        if (
          e.offsetY > quadPoints[i].y * imageDims.height - pad &&
          e.offsetY < quadPoints[i].y * imageDims.height + pad
        ) {
          closestPoint = i;
          break;
        }
      }
    }
  }
  return [
    {
      nearbyPoint: closestPoint,
      initialPoint: { x: e.offsetX, y: e.offsetY },
    },
  ];
}

function movePoint(
  imageDims: Dimensions,
  quadPoints: Point[],
  e: MouseEvent,
  initialPoint,
  nearbyPoint: number
) {
  if (nearbyPoint > -1) {
    const moveThreshold = 2;
    if (
      Math.abs(e.offsetX - initialPoint.x) >= moveThreshold ||
      Math.abs(e.offsetY - initialPoint.y) >= moveThreshold
    ) {
      const xShift = (e.offsetX - initialPoint.x) / imageDims.width;
      const yShift = (e.offsetY - initialPoint.y) / imageDims.height;
      quadPoints[nearbyPoint] = {
        x: quadPoints[nearbyPoint].x + xShift,
        y: quadPoints[nearbyPoint].y + yShift,
      };
    }
  }
}

function nudgePoint(
  direction: string,
  imageDims: Dimensions,
  id,
  quadPoints: Point[],
  ctx: CanvasRenderingContext2D,
  nearbyPoint: number
) {
  const distance = 1;
  switch (direction) {
    case "Up":
      quadPoints[nearbyPoint] = {
        x: (quadPoints[nearbyPoint].x * imageDims.width + 0) / imageDims.width,
        y:
          (quadPoints[nearbyPoint].y * imageDims.height - distance) /
          imageDims.height,
      };
      break;
    case "Down":
      quadPoints[nearbyPoint] = {
        x: (quadPoints[nearbyPoint].x * imageDims.width + 0) / imageDims.width,
        y:
          (quadPoints[nearbyPoint].y * imageDims.height + distance) /
          imageDims.height,
      };
      break;
    case "Left":
      quadPoints[nearbyPoint] = {
        x:
          (quadPoints[nearbyPoint].x * imageDims.width - distance) /
          imageDims.width,
        y:
          (quadPoints[nearbyPoint].y * imageDims.height + 0) / imageDims.height,
      };
      break;
    case "Right":
      quadPoints[nearbyPoint] = {
        x:
          (quadPoints[nearbyPoint].x * imageDims.width + distance) /
          imageDims.width,
        y:
          (quadPoints[nearbyPoint].y * imageDims.height + 0) / imageDims.height,
      };
      break;
  }
  drawNodes(imageDims, quadPoints, ctx, nearbyPoint);
  drawRect(imageDims, quadPoints, ctx, nearbyPoint);
  SaveQuadPointsToLocalStorage(id, quadPoints);
}

function nudgePointsButtons(state: boolean) {
  document.querySelector<HTMLButtonElement>("#nup")!.disabled = !state;
  document.querySelector<HTMLButtonElement>("#ndown")!.disabled = !state;
  document.querySelector<HTMLButtonElement>("#nleft")!.disabled = !state;
  document.querySelector<HTMLButtonElement>("#nright")!.disabled = !state;
}

export function setLocalStorage(key: string, value: string) {
  const store = (window as any).localStorage;
  store.setItem(key, value);
}

export function getLocalStorage(key: string) {
  const store = (window as any).localStorage;
  return store.getItem(key);
}

export function removeLocalStorage(key: string) {
  const store = (window as any).localStorage;
  store.removeItem(key);
}

function SaveQuadPointsToLocalStorage(id: string, quadPoints: Point[]) {
  if (quadPoints && quadPoints.length == 4) {
    setLocalStorage(id, JSON.stringify(quadPoints));
  }
}

function GetQuadPointsFromLocalStorage(id: string) {
  return JSON.parse(getLocalStorage(id));
}

export async function exportQuadPoints() {
  // collect data
  let data: any = {};
  const container = document.getElementById("dirlist");
  if (container) {
    for (const file of container.childNodes) {
      const name = file.textContent;
      if (name) {
        const res = GetQuadPointsFromLocalStorage(name);
        if (res != null && res.length > 0) {
          data[name] = res;
        }
      }
    }
  }

  // error check data
  if (Object.keys(data).length === 0) {
    alert("Error: Data not found.");
    return;
  }

  // setup export file
  let json: any = { pageRatio: getLocalStorage("pageRatio") };
  json.files = data;

  // get file handler to save to
  const fileHandle = await (window as any).showSaveFilePicker({
    suggestedName: "files.json",
    types: [
      {
        description: "Text documents",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  });

  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(json, null, 2));
  await writable.close();

  // delete data from localstorage
  if (window.confirm("Remove cached data?")) {
    if (container) {
      for (const file of container.childNodes) {
        const name = file.textContent;
        if (name) {
          removeLocalStorage(name);
        }
      }
    }
    const defaultPageRatio = "0.71";
    setLocalStorage("pageRatio", defaultPageRatio);
    document.querySelector<HTMLButtonElement>("#pageratioinput")!.value =
      defaultPageRatio;
    document.querySelector<HTMLButtonElement>("#preview")!.disabled = false;
  }

  // reset ui
  container!.innerHTML = "";
  document.getElementById("app__right__view")!.innerHTML = "";
  document.getElementById("app__right__preview")!.innerHTML = "";
  document.getElementById("app__right__content")!.style.display = "flex";
  document.getElementById("dirlist")!.innerHTML = "";
  document.querySelector<HTMLButtonElement>("#export")!.disabled = true;
}

export async function importQuadPoints() {
  const [fileHandle] = await (window as any).showOpenFilePicker();
  if (!fileHandle) {
    return;
  }

  // check for existing data on current image
  const canvasImage = document.getElementById(
    "app__right__view__canvas__image"
  );
  const name = canvasImage?.getAttribute("data-name") as string;
  const anyExistingQuadPoints = GetQuadPointsFromLocalStorage(name);

  // import data from file into local storage
  const file = await fileHandle.getFile();
  const text = await file.text();
  const json = JSON.parse(text);
  setLocalStorage("pageRatio", json.pageRatio);
  document.querySelector<HTMLButtonElement>("#pageratioinput")!.value =
    json.pageRatio;
  for await (const [key, value] of Object.entries(json.files)) {
    SaveQuadPointsToLocalStorage(key, value as Point[]);
  }

  // alert user to update image if imported data is different than previous existing
  if (
    name &&
    JSON.stringify(anyExistingQuadPoints) !==
      JSON.stringify(GetQuadPointsFromLocalStorage(name))
  ) {
    alert("Reload image to draw newly imported quadrilateral.");
  }
}

export async function preview(file) {
  // this function should only be called if it's possible to preview the image (four quad points saved in local storage, etc.)

  // get current file
  const cur: any = document.querySelector<HTMLElement>(
    ".dirlist__currentFile"
  )!;

  // get quad points of current file
  const name = cur?.getAttribute("data-name") as string;
  const points = GetQuadPointsFromLocalStorage(name);

  // set up html
  const previewArea = <Element>document.getElementById("app__right__preview");
  previewArea.innerHTML = `
    <div id="modal">
      <div id="modal__controls" class="bottom_controls">
        <button id='modal__close' type='button'>Close Preview</button>
      </div>
      <canvas id="modal__canvas" ></canvas>
    </div>
  `;

  const cv: any = (window as any).cv;

  // transform image onload
  const imageObj = new Image();
  imageObj.onload = function () {
    const pageRatio = parseFloat(getLocalStorage("pageRatio"));
    const maxHeight = 1600;

    let srcImage = cv.imread(imageObj);
    const { width, height } = srcImage.size();

    const imageRatio = width / height;

    const scaledWidth = maxHeight * imageRatio;
    const scaledHeight = maxHeight;

    let scaledImage = new cv.Mat();
    cv.resize(srcImage, scaledImage, {
      width: scaledWidth,
      height: scaledHeight,
    });

    let dstImage = new cv.Mat();

    const scaledPoints = [
      points[0]["x"] * scaledWidth,
      points[0]["y"] * scaledHeight,
      points[1]["x"] * scaledWidth,
      points[1]["y"] * scaledHeight,
      points[3]["x"] * scaledWidth,
      points[3]["y"] * scaledHeight,
      points[2]["x"] * scaledWidth,
      points[2]["y"] * scaledHeight,
    ];

    const dstPoints = [
      0,
      0,
      scaledWidth,
      0,
      0,
      scaledHeight,
      scaledWidth,
      scaledHeight,
    ];

    const scaledPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, scaledPoints);
    const dstPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints);

    const transformMatrix = cv.getPerspectiveTransform(
      scaledPointsMat,
      dstPointsMat
    );

    cv.warpPerspective(
      scaledImage,
      dstImage,
      transformMatrix,
      scaledImage.size(),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    );

    const dstSize = dstImage.size();

    cv.resize(dstImage, dstImage, {
      width: (dstSize.height * pageRatio) / 2,
      height: dstSize.height / 2,
    });

    cv.imshow("modal__canvas", dstImage);

    // Clear up memory
    scaledPointsMat.delete();
    dstPointsMat.delete();
    transformMatrix.delete();
    srcImage.delete();
    scaledImage.delete();
    dstImage.delete();
  };
  imageObj.src = URL.createObjectURL(file);

  document.getElementById("app__right__view")!.style.display = "none";
  document.getElementById("app__right__preview")!.style.display = "block";

  document
    .querySelector<HTMLButtonElement>("#modal__close")!
    .addEventListener("click", () => {
      document.getElementById("app__right__view")!.style.display = "block";
      document.getElementById("app__right__preview")!.style.display = "none";
    });
}

export function setPageRatio(value: string) {
  const pageRatio = parseFloat(value);
  if (isNaN(pageRatio)) {
    alert("Could not parse information. Page ratio has not been changed.");
    return;
  }
  setLocalStorage("pageRatio", pageRatio.toString());
  alert("Page ratio set to " + pageRatio.toString());
}

function iterateFile(dir: string = "nextSibling") {
  const currentFile: any = document.querySelector<HTMLElement>(
    ".dirlist__currentFile"
  )!;
  if (currentFile[dir] == null) {
    alert("No files left");
    return;
  }
  removeCurrentFile();
  currentFile[dir].click();
  currentFile[dir].focus();
  currentFile[dir].blur();
  currentFile[dir].scrollIntoView({ behavior: "smooth", block: "center" });
}

function nextFile() {
  iterateFile("nextSibling");
}

function prevFile() {
  iterateFile("previousSibling");
}
