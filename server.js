const express = require('express')
const winston = require('winston')
const app = express()
const port = 3000

app.use(express.json())

const fs = require('fs')

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs')
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

//addition
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query
    if (isNaN(num1) || isNaN(num2)) {
        const errorMsg = 'Invalid input numbers'
        logger.error(`${errorMsg}: ${num1}, ${num2}`)
        return res.status(400).json({ Error: errorMsg })
    }
    const result = parseFloat(num1) + parseFloat(num2)
    logger.info(`Addition: ${num1} + ${num2} = ${result}`)
    res.json({result})
})

//subtraction
app.get('/subtract', (req, res) => {
    const { num1, num2 } = req.query
    if (isNaN(num1) || isNaN(num2)) {
        const errorMsg = 'Invalid input numbers'
        logger.error(`${errorMsg}: ${num1}, ${num2}`)
        return res.status(400).json({ Error: errorMsg })
    }
    const result = parseFloat(num1) - parseFloat(num2)
    logger.info(`Addition: ${num1} + ${num2} = ${result}`)
    res.json({result})
})

//multiplication
app.get('/multiply', (req, res) => {
    const { num1, num2 } = req.query
    if (isNaN(num1) || isNaN(num2)) {
        const errorMsg = 'Invalid input numbers'
        logger.error(`${errorMsg}: ${num1}, ${num2}`)
        return res.status(400).json({ Error: errorMsg })
    }
    const result = parseFloat(num1) * parseFloat(num2)
    logger.info(`Addition: ${num1} + ${num2} = ${result}`)
    res.json({result})
})

// Division
app.get('/divide', (req, res) => {
    const { num1, num2 } = req.query
    if (isNaN(num1) || isNaN(num2)) {
        const errorMsg = 'Invalid input numbers'
        logger.error(`${errorMsg}: ${num1}, ${num2}`)
        return res.status(400).json({ error: errorMsg })
    }
    if (parseFloat(num2) === 0) {
        const errorMsg = 'Cannot divide by zero'
        logger.error(errorMsg);
        return res.status(400).json({ error: errorMsg })
    }
    const result = parseFloat(num1) / parseFloat(num2)
    logger.info(`Division: ${num1} / ${num2} = ${result}`)
    res.json({ result })
})

//Exponentiation: num1 ^ num2
app.get('/power', (req, res) => {
    const { num1, num2 } = req.query;
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid input numbers' })
    }
    const result = Math.pow(parseFloat(num1), parseFloat(num2))
    logger.info(`Power: ${num1} ^ ${num2} = ${result}`)
    res.json({ result })
})

// Square Root: √num1
app.get('/sqrt', (req, res) => {
    const { num1 } = req.query;
    if (isNaN(num1)) {
        return res.status(400).json({ error: 'Invalid input number' })
    }
    if (parseFloat(num1) < 0) {
        return res.status(400).json({ error: 'Cannot compute square root of negative number' })
    }
    const result = Math.sqrt(parseFloat(num1))
    logger.info(`Square Root: √${num1} = ${result}`)
    res.json({ result })
});

// Modulo: num1 % num2
app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid input numbers' })
    }
    const result = parseFloat(num1) % parseFloat(num2)
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`)
    res.json({ result })
});

app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`)
})