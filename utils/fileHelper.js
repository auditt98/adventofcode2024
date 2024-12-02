import fs from "fs";

const read = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

const splitIntoLines = (text) => {
  return text.split('\n')
}

const splitByLine = (line, separator) => {
  return line.split(separator)
}

export default {
  read,
  splitByLine,
  splitIntoLines
};