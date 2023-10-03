import { Grid } from 'react-loader-spinner'

function Loader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '15%', marginBottom: '20%' }}>
     <Grid
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
  )
}

export default Loader