<script>
    fetch("MOCK_DATA.csv").then((res) => {
        return res.text();
    }).then((data) => {
        const lines = data.split('\n'); //Split String on lines
        const keys = lines.shift().split(',');
        console.log(data)
    }).catch((err) => {
        console.log(err.message);
    });

    function ObjectCSV(arr) {
        var user = {};

    };

</script>
