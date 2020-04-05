import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = () => {
    return (
        <h1>give feedback</h1>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ data }) => {
    const { good, bad, neutral, all } = data
    const average = (good - bad) / all
    const positive = good / all * 100

    if (all > 0) {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={all} />
                        <Statistic text="average" value={average} />
                        <Statistic text="positive" value={positive + " %"} />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const data = {
        good,
        neutral,
        bad,
        all
    }

    const increaseFeedback = (setter, feedback) => () => {
        setter(feedback + 1)
        setAll(all + 1)
    }

    return (
        <div>
            <Header />
            <Button handleClick={increaseFeedback(setGood, good)} text={"good"} />
            <Button handleClick={increaseFeedback(setNeutral, neutral)} text={"neutral"} />
            <Button handleClick={increaseFeedback(setBad, bad)} text={"bad"} />
            <Statistics data={data} />
        </div>
    )
}


ReactDOM.render(<App />,
    document.getElementById('root')
)