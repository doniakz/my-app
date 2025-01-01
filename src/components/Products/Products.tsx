import React, {FC, useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from '@mui/material/PaginationItem';
import CreateShow from "../CreateShow/CreateShow";
import "../../App.css"
import {Link, RouteComponentProps, useLocation} from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import Add from "../../img/add.svg";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ProductModel from "./ProductModel";
import {BiEdit} from "react-icons/bi";
import EditIcon from "../Icon/EditIcon";
import Toman from "../../img/Toman.svg";
const pageSizeList = [
    {value: '10', label: '10'},
    {value: '20', label: '20'},
    {value: '30', label: '30'},

]
let listProductCheck: any;
let len: number;
type SomeComponentProps = RouteComponentProps;
const Products: FC<SomeComponentProps> = ({ history }) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<any>(10);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [check, setCheck] = useState<boolean>(true)
    const [messageBorolive, setMessageBorolive] = useState()
    const token =  Cookies.get("token")
    localStorage.setItem("listProduct", '')


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const productsData = async () => {
       
         axios.get(``, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Requested-With': 'fetch',
                'Cache-Control':"no-store"
            }
        })
            .then((res) => {

                setMessageBorolive(res.data.message)
                setProducts(res.data.data)
                setChecked(true)

            })
            .catch((err: any) => {
                console.log(err)
            })
    };
    useEffect(() => {
        productsData();
    }, [])

    const handelPageSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPageSize(e.target.value)
    }

    const sendList = (event: React.FormEvent) => {
        event.preventDefault();

    }
    const createDis=(from:string):string=>{
            if(from=='CreateShow'){
                return `displyLink`;
            }else {
                return ``;
            }
    }
    const editDis=(from:string):string=>{
        if(from=='editShows'){
            return `displyLink`;
        }else {
            return ``;
        }
    }
    const handelAdd= (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        history.push("/createProduct" );
    }
    const handelEdit= (e: React.MouseEvent<HTMLButtonElement>, productCode: undefined)=>{
        history.push("/createProduct" ,{productCode} );
    }

    const IsDisabledAdd=()=>{
        console.log(messageBorolive)
        if(messageBorolive==="Admin"  ){
            return false
        }else {
            return true
        }
    }
    return (
        <div className="App">
            {checked&&( <div className={IsDisabledAdd() ? 'displyLink ' : 'row'} >
                <div className="col-12 col-md-4 ">
                    <button  onClick={(e)=>{handelAdd(e)}} className={ 'butClose'}>
                        <img className={"imgRight"} style={{width: "72px", height: "72px"}} src={Add}/>
                    </button>

                </div>
            </div>
            )}

            <form>
                <div>
                    {checked&&(
                        <ul id={"limheight"}>
                            {products.map((product) => {
                                
                                return (
                                    <li>
                                        <div>
                                            <div className={'list-container'}>
                                                <div className={"imgList"}>
                                                    <img alt={"logo"}  src={`${product.productUrl}?v=${new Date().getTime()}`} className={"imgProduct"}/>
                                                </div>
                                                <div className={'titel'}>
                                                    <span>{product.productName}</span>
                                                </div>
                                                <div className={'pric'}>
                                                    <span> قیمت:    {((product.productPrice)/100*10).toLocaleString('fa', {
                                                        useGrouping: true,
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    }).split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('')}<img className={"shopSlid-productPricediv"} src={Toman}/></span>
                                                </div>
                                    
                                                <button  className={ 'avatarBtn'} onClick={(e)=>handelEdit(e,product.productId)}>
                                                    <div className={IsDisabledAdd() ? 'displyLink editProduct activIcon' : 'editProduct activIcon'} >
                                                        <EditIcon></EditIcon>
                                                    </div>

                                                </button>

                                            </div>

                                        </div>

                                    </li>
                                );

                            })}


                        </ul>
                    )}

                </div>


            </form>
        </div>


    )
}

export default Products;