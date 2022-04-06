const express = require('express')
const morgan = require('morgan');
const body_parser = require('body-parser');
const { default: axios } = require('axios');
const router = express.Router();

const app = express()
const SYSTEM_PORT = process.env.PORT || 6999

// Route
router.post('/', (req, res) => {
    
    const { callback } = req.body
    axios.get(callback).then(() => {
        res.status(200).json({success: true})
    }).catch(() => {
        res.status(404).json({success: false})
    })
})

// Setup morgan logger configurations
morgan.token('date', () => {
    const p = new Date().toString().replace(/[A-Z]{3}\+/, "+").split(/ /);
    return p[2] + "/" + p[1] + "/" + p[3] + ":" + p[4] + " " + p[5];
})

// Set morgan and body_parser to service handler
app.use(morgan('combined'));
app.use(body_parser.json({limit: '50mb'}));
app.use(body_parser.urlencoded({limit: '50mb', extended: true}));
app.use('/', router)

app.listen(SYSTEM_PORT, () => console.log(`[SYSTEM]: Service started at PORT ${SYSTEM_PORT}!`))