//Turn Data table into js object with the first line as legend

fetch("MOCK_DATA.csv").then((res) => {
    return res.text();
}).then((data) => {
    const lines = data.split('\n'); //Split String on lines
    const keys = lines.shift().split(',');
    console.log(data)
}).catch((err) => {
    console.log(err.message);
});

    fetch('MOCK_DATA.csv').then(function(res) {
        console.log("Fetching CSV data");
        return res.text();
    }).then(function(text) {
        console.log("streaming CSV data");
        var users = ObjectCVS(text);
        console.log(users);
    }).catch(function(error) {
        console.log(error);
    });

    function ObjectCVS(text) {
        const users = {};
        const array = text.split('\n');
        const keys = array.shift().split(',');

        for (var i = 0; i < array.length - 1; i++) {
            const info = array[i].split(',');
            const ArrObj = {};
            var index = 0;

            while (index < keys.length) {
                var key = keys[index];
                if (key === 'id') {
                    ArrObj[key] = Number(info[index]);
                } else if (key === 'age') {
                    ArrObj[key] = Number(info[index]);
                } else if (key === 'date') {
                    ArrObj[key] = new Date(info[index] * 1000);
                } else if (key === 'email') {
                    ArrObj[key] = info[index];
                } else if (key === 'gender') {
                    ArrObj[key] = info[index];
                } else if (key === 'prefix') {
                    ArrObj[key] = info[index];
                } else if (key === 'rating') {
                    ArrObj[key] = Number(info[index]);
                } else if (key === 'first_name') {
                    ArrObj[key] = info[index];
                } else if (key === 'last_name') {
                    ArrObj[key] = info[index];
                }
                index += 1
            }
            users[ArrObj.id] = ArrObj;
        }
        return users
    };

