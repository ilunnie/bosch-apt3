import { useState, useEffect } from 'react'
import { Card as CardProdutos } from './components/CardProdutos/Card'
import { Card as CardPersonagens } from './components/CardPersonagens/Card'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import errorImg from '../public/error404.png';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")
  const [nextPage, setNextPage] = useState(true)
  const [apiError, setApiError] = useState(false)

  const senai = [-25.4217573, -49.2740144]
  const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`)
      .then((response) => {
        if (!response.data.results) {
          console.log("Vazio")
        }
        setData(response.data.results)
        setApiError(false)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("Esta pagina nao contem este personagem")
          setApiError(true)
          setData([])
        }
      })
    GetNextPage()
  }, [page, name])

  useEffect(() => setPage(1), [name])

  function GetNextPage() {
    api.get(`/character/?page=${page + 1}&name=${name}`)
      .then((response) => {
        if (response.data.results)
          setNextPage(true)
      })
      .catch((error) => {
        setNextPage(false)
      })
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
            <div style={apiError ? { display: "none" } : { display: "block" }}>
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
              <div className={style.pageNavigator}>
                <button onClick={() => setPage(page - 1)} disabled={page <= 1}>«</button>
                <p>{page}</p>
                <button onClick={() => setPage(page + 1)} disabled={!nextPage}>»</button>
              </div>
            </div>
            <div className={style.errorContent} style={apiError ? { display: "flex" } : { display: "none" }}>
              <img src={errorImg} alt="error 404" />
              <h2>Esta pagina nao contem este personagem</h2>
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              <MapContainer style={{ height: "80vh" }} center={senai} zoom={50} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={senai} icon={redIcon}>
                  <Popup>
                    Sistema Fiep <br /> Unidade Centro
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
