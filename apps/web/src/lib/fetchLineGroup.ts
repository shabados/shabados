// line group with slice notation
// e.g. DMP:0:1 as " line-group : start : end "
// similar to javascript's slice function
//
// can accept null and negative numbers
// e.g. DMP:0:1 is the same as DMP::1 or DMP::-9
// given DMP has 10 lines total

const fetchLineGroup = async (id: string) => {
  const s = id.split(':');

  const data = await fetch(`https://shabados.com/api/g/${s[0]}`).then((res) =>
    res.json(),
  );

  if (s.length > 1) {
    const p = {
      start: 0 as number,
      end: undefined as number | undefined,
    };

    if (s.length > 2) {
      p.start = isNaN(parseInt(s[1])) ? 0 : parseInt(s[1]);
      p.end = isNaN(parseInt(s[2])) ? undefined : parseInt(s[2]);
    } else if (s.length == 2) {
      p.start = parseInt(s[1]);
      p.end = undefined;
    }

    data.data.default.src = data.data.default.src.slice(p.start, p.end);
  }

  return data;
};

export default fetchLineGroup;
