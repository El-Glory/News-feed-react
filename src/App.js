import React,{useEffect,useState} from 'react'
import './App.css';
import News from './newsTable.js'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
  },
   root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const App = () => {
 const classes = useStyles();
  const API_KEY = "33f523856ef844298bf9d5d08079565e"

  //const exampleReq = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`
  const [news, setNews] = useState([])
  const [search, setSearch]  = useState('')
  const [page, setPage] = React.useState(2)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)




  useEffect(() => {
   getNews();
  },[])

  const getNews = async() =>{
    const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data.articles)
    setNews(data.articles)    
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0)
  }

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, row.length - page * rowsPerPage);

  return(
    <div className="App">
      <form>
      <div className="classes.root">
        <input type="text" placeholder="search" onChange={e=>{
          setSearch(e.target.value)
        }}/>
        
         <Button variant="outlined" color="primary" type="submit">
        Search
      </Button>
      </div>
      </form>
      {/*{news.filter(news =>{
        if(search == ""){
          return news
        }
        else if(news.author.toLowerCase().includes(search.toLowerCase())){
          return news
        }
      })
        .map(news => { 
        return(
          <p>
            {news.author} - {news.publishedAt} 
          </p>
        )})
    }*/}

     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">URL</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {news.filter(item =>{
        if(search == ""){
          return item
        }
        else if(item.author.toLowerCase().includes(search.toLowerCase())){
          return item
        }
      })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(item => { 
        return(
          <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
              <img src={item.urlToImage} alt=""></img>
              </StyledTableCell>
              <StyledTableCell align="right">{item.source.name}</StyledTableCell>
              <StyledTableCell align="right">{item.author}</StyledTableCell>
              <StyledTableCell align="right">{item.title}</StyledTableCell>
              <StyledTableCell align="right">{item.publishedAt}</StyledTableCell>
              <StyledTableCell  align="right"><a href={item.url}>{item.url}</a></StyledTableCell>

            </StyledTableRow>
        )})
    }
          
            
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
        //rowsPerPageOptions={[5, 10, 25]}
        component = "div"
        count ={100}
        page={page}
        onChangePage = {handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage = {handleChangeRowsPerPage}
    ></TablePagination>
    </div>
    )
}

export default App;
