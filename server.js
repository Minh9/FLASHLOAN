const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
app.set('view engine', 'ejs');
let first =20;
app.get('/', async(req, res) => {

    const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
        {
            query:`
            {
                flashLoans(first:${first}, orderBy:timestamp, orderDirection:desc)
                {
                    id
                    reserve {
                        name
                        symbol
                    }
                    amount
                    target
                    timestamp
                }
            }

            `
        }
    );
    res.render('index',{userdata:result.data.data.flashLoans});

}

)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})