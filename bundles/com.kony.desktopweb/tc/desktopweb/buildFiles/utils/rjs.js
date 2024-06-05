import requirejs from 'requirejs';

const rjsTask = (requirePath, dest, fileName) => {
    return new Promise((resolve,reject) => {

        console.log("RequireJs Task begins");

        var config = {
            baseUrl: requirePath,
            name: fileName,
            out: dest+'/kvmodules.js'
        }

        requirejs.optimize(config, function (/* buildResponse */) {

            console.log("RequireJs Task Ended - kvmodules.js generated successfully ");
            resolve();

        }, function(err) {

            console.log("RequireJs error is thrown" + err);
            reject();
        });
    });
}

export {rjsTask};
