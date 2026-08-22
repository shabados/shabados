import argparse
import os
import shutil
import subprocess

from fontTools.ttLib import TTFont

SOURCE = "sources/SantLipiFlex.glyphs"

VARIABLE_DIR = "variable_ttf"
INSTANCE_DIR = "instance_ttf"
INSTANCE_WOFF2_DIR = "instance_woff2"


def fontmake(*args):
    # keep masters and instances out of the working tree
    cmd = [
        "fontmake",
        "-g",
        SOURCE,
        "--instance-dir",
        "{tmp}",
        "--master-dir",
        "{tmp}",
    ]
    subprocess.run(cmd + list(args), check=True)


def compress(directory, output_directory=None):
    # create woff2 versions of every ttf in directory
    output_directory = output_directory or directory
    if not os.path.exists(output_directory):
        os.mkdir(output_directory)
    for filename in os.listdir(directory):
        if not filename.endswith(".ttf"):
            continue
        new_filename = os.path.splitext(filename)[0] + ".woff2"
        font = TTFont(os.path.join(directory, filename))
        font.flavor = "woff2"
        font.save(os.path.join(output_directory, new_filename))


def organize(*pairs):
    # clean any existing files from previous builds, then move into build/
    for _, folder in pairs:
        destination = os.path.join("build", folder)
        if os.path.exists(destination):
            shutil.rmtree(destination)
    os.makedirs("build", exist_ok=True)
    for directory, folder in pairs:
        os.rename(directory, os.path.join("build", folder))


def var():
    # generate variable ttf font
    fontmake("--verbose", "WARNING", "-o", "variable")

    compress(VARIABLE_DIR)

    organize((VARIABLE_DIR, "variable"))


def all():
    # generate variable and interpolated instance ttf fonts
    fontmake("-o", "variable")
    fontmake("-i", "-o", "ttf")

    compress(VARIABLE_DIR)
    compress(INSTANCE_DIR, INSTANCE_WOFF2_DIR)

    organize(
        (VARIABLE_DIR, "variable"),
        (INSTANCE_DIR, "ttf"),
        (INSTANCE_WOFF2_DIR, "woff2"),
    )


def fmt():
    # sort imports, then format
    subprocess.run(["ruff", "check", "--select", "I", "--fix", "."], check=True)
    subprocess.run(["ruff", "format", "."], check=True)


def main():
    parser = argparse.ArgumentParser(prog="make", description="Build font files.")
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("all", help="build variable and instanced fonts")
    commands.add_parser("var", help="build the variable font only")

    args = parser.parse_args()

    if args.command == "all":
        all()
    else:
        var()
