import { PayPalScriptProvider , PayPalButtons , usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useEffect } from 'react'

const style = {"layout" : 'vertical'}


const ButtonWrapper = ({showSpinner , currency , amount}) => {
  const [{isPending , options}, dispatch] = usePayPalScriptReducer()
  useEffect(() => {
    dispatch({
      type : 'resetOptions',
      value : {
        ...options , currency : currency
      }
    })
  }, [currency , showSpinner])

  return(
    <>
    {(showSpinner && isPending) && <div className="spinner" />}
    <PayPalButtons
    style={style}
    disabled={false}
    forceReRender={[style , currency , amount]}
    fundingSource={undefined}
    createOrder={(data , actions) => actions.order.create({
      purchase_units : [
        {amount : {currency_code : currency , value : amount}}
      ]
    }).then(orderId =>  orderId)}
    onApprove={(data , actions) => actions.order.capture().then( async (response) => {
      console.log(response)
      // if(response.status === "COMPLETED"){
      //   console.log(response)
      // }
    })}
    />
    </>
  )
}

export default function Paypal({amount}){
  return (
    <div style={{minHeight : '200px' , maxWidth : '750px' , margin : 'auto'}}>
      <PayPalScriptProvider options={{ clientId : "test" ,components : "buttons" , currency : "USD" }}>
        <ButtonWrapper currency={"USD"} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  )
}