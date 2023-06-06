import Card from "./Card";


// props:
//   data: consists of data records to be rendered
const List = ({ data }) => (
  data ? (<div className="list">
    {/* Your code goes here */}
    {/* Render the Card with required props here */}
    {data.records?data.records.map((dt,i)=>{
      return <Card key={i} _id={dt._id} team1={dt.team1} team2={dt.team2} index={i+1} count={data.count} venue={dt.venue} date={dt.date}/>
    }):data.map((dt,i)=>{
      return <Card key={i} _id={dt._id} team1={dt.team1} team2={dt.team2} index={i+1} count={data.count} venue={dt.venue} date={dt.date}/>
    })}
  </div>) : null
);


export default List;