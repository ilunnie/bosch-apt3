import style from './Card.module.css'

/* eslint-disable react/prop-types */
export const Card = (props) => {
  const item = props.item;
  return (
    <div className={style.content}>
      <h1 className={style.status} style={item.status ? {color: "green"} : {color: "red"}}>●</h1>
      <div className={style.image}>
        <img
          src={item.image}
          alt={item.name}
        />
      </div>
      <h2>{item.name}</h2>
      <h3>{item.desc}</h3>
      <p>R${item.value}</p>
    </div>
  )
}