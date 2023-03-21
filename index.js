import http, {request} from "http";
import fetch from "node-fetch";

// const http = require("http");

const PORT = 9090;

const server = http.createServer((req, res) => {
    const url = req.url
    let tableData = `
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Birth Year</th>
                <th>Gender</th>
                <th>URL</th>
            </tr>
        `
    if(url === "/") {
        res.write("Home Page");
        return res.end();
    }
     
     if(url === "/list") {
        fetch("https://swapi.dev/api/people")
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                createData(data)
                res.write(tableData);
                return res.end();
            });
            
            function createData(data) {
                // let newData = JSON.parse(data)
                // dataArray = Array.from(data)
                if(Array.isArray(data)) {
                    data.forEach(element => {
                        tableData += `
                //         <tr>
                //             <td>${element.name}</td>
                //             <td>${element.height}</td>
                //             <td>${element.birth_year}</td>
                //             <td>${element.gender}</td>
                //             <td>${element.url}</td>
                //         </tr>`
                    });
                    // tableData += `</table>`

                // } else if(url !== "/" || url !== "/list") {
                //     res.write("Page Not Found" + " 😢 ");
                //     // res.end();
                // }
            }
            // if(url !== "/" || url !== "/list") {
                else {
                res.write("Page Not Found" + " 😢 ");
                return res.end();
            }
            tableData += `</table>`
    }
}
}).listen(PORT, console.log("Server listening to port " + PORT));

