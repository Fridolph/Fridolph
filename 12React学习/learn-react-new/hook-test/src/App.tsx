import { useEffect, useState } from 'react'

// function App() {
//   const [num, setNum] = useState(1)

//   return <button onClick={() => setNum(num + 1)}>{num}</button>
// }

// function App() {
//   const [num, setNum] = useState(() => {
//     const num1 = 1 + 2
//     const num2 = 2 + 3
//     return num1 + num2
//   })

//   return <button onClick={() => setNum((prevNum) => prevNum + 2)}>{num}</button>
// }

async function queryData() {
  const data = await new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve('loading')
    }, 1000)
  })
  return data
}

function App() {
  const [num, setNum] = useState(0)

  useEffect(() => {
    queryData().then((data: any) => {
      data === 'loading' ? setNum(2) : setNum(0)
    })
  })

  return <button onClick={() => setNum(num + 1)}>{num}</button>
}

export default App
