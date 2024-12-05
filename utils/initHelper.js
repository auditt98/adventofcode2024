import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to create the folder and files
const createFolderAndFiles = (dayNumber) => {
  const folderName = `day${dayNumber}`;
  const folderPath = path.join(process.cwd(), folderName);

  // Check if folder already exists
  if (fs.existsSync(folderPath)) {
    console.log(`Folder "${folderName}" already exists.`);
    rl.close();
    return;
  }

  // Create the folder
  fs.mkdirSync(folderPath);
  console.log(`Folder "${folderName}" created.`);

  // Define file paths
  const files = ['input.txt', 'test.txt', 'index.js'];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.writeFileSync(filePath, '', 'utf8'); // Create an empty file
    console.log(`File "${file}" created in folder "${folderName}".`);
  });

  rl.close();
};

// Ask the user for the day number
rl.question('Enter the day number: ', (answer) => {
  const dayNumber = parseInt(answer, 10);
  if (isNaN(dayNumber)) {
    console.log('Please enter a valid number.');
    rl.close();
  } else {
    createFolderAndFiles(dayNumber);
  }
});
