const fs = require('fs');
const {
    exec
} = require('child_process');

// Read the contents of package.json file
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Log the contents of package.json
console.log(packageJson.dependencies);

const allDep = packageJson.dependencies;

let obj = {};
let obj1 = {};
let counter = 0;
const total = Object.entries(allDep).length;

for (const [key, value] of Object.entries(allDep)) {
    console.log(`npm view ${key} dependencies`);


    exec(`npm view ${key} dependencies`, function(err, stdout, stderr) {
        if (err) {
            // console.error(err);
            return;
        }

        const dependencies = stdout.trim().split('\n').reduce((acc, curr) => {
            const [name, version] = curr.split(': ');
            acc[name] = version;
            return acc;
        }, {});

        Object.assign(obj, dependencies);

        for (const [k, v] of Object.entries(obj)) {
            counter++;
            console.log(k);
            exec(`npm view ${k} dependencies`, function(err, stdout, stderr) {
                if (err) {
                    //console.error(err);
                    return;
                }

                const dependencies1 = stdout.trim().split('\n').reduce((acc, curr) => {

                    if (acc != null || acc != undefined || Object.keys(acc).length != 0) {
                        const [name, version] = curr.split(': ');

                        acc[name] = version;
                        return acc;
                    }
                }, {});

                Object.assign(obj1, dependencies1);
            });

        }
        console.log(counter);
    });
}