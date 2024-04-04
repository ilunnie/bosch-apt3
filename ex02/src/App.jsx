import { useState, useEffect } from 'react'
import { Card as CardProdutos } from './components/CardProdutos/Card'
import { Card as CardPersonagens } from './components/CardPersonagens/Card'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")


  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        console.log("Esta pagina nao contem este personagem")
      }
    })
  }, [page, name])

  function addPage(quant)
  {
    setPage(page + quant)
    console.log(page)
  }

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.list}>
              {produtos.map((item) => {
                return (
                  <CardProdutos item={item} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type='text' placeholder='Pesquisar' onChange={(event) => setName(event.target.value)} />
              {/* <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} /> */}
            </div>
            <div className={style.list}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <CardPersonagens item={item} />
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
            <div>
              <button onClick={() => addPage(-1)}></button>
              <button onClick={() => addPage(1)}></button>
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              mapa aqui
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
