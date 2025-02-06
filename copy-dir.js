const fs = require('fs-extra');

const listFolderCopy = [
    {
        sourceDirectory: 'views',
        targetDirectory: 'dist/views'
    },
    {
        sourceDirectory: 'public',
        targetDirectory: 'dist/public'
    }
];

listFolderCopy.forEach(item => {
    fs.copy(item.sourceDirectory, item.targetDirectory, (error) => {
        if (error) {
            console.log(`Error copy directory ${item.sourceDirectory}:`, error);
        } else {
            console.log(`Copy successfully directory ${item.sourceDirectory}`);
        }
    });
});