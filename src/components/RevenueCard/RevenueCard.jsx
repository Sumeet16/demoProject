import React, { useEffect } from 'react'
import './RevenueCard.css'
const RevenueCard = ({title, amount}) => {
  return (
    <>
            <div className='revenue-card'>
                <h3>{title}</h3>
                <h4>$ {amount}</h4>
            </div>
    </>
  )
}

export default RevenueCard