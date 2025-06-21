const outputUnusedFiles = (unusedFiles: string[]): void => {
  if (unusedFiles.length === 0) {
    console.log("No unused components found.");
    return;
  }

  console.log(`Found ${unusedFiles.length} unused components:`);
  
  unusedFiles.forEach((file) => {
    console.log(`- ${file}`);
  });
};

export default outputUnusedFiles;