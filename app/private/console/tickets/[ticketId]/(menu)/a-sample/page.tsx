
interface ISampleTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: ISampleTicketPage) => {
  const ticketId = (await params).ticketId; 

  
  return (
    <div>
      
    </div>
  )
}

export default page
