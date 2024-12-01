import fs from "fs";

export function read(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

function splitIntoLines(text) {
  return text.split('\n')
}

function splitByLine(line, separator) {
  return line.split(separator)
}

export default {
  read,
  splitByLine,
  splitIntoLines
};