import React, {FC, useEffect, useState} from "react";
import {Link, RouteComponentProps, useLocation} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../App.css";
import Avatar from "@mui/material/Avatar";
import {pink} from "@mui/material/colors";
import PageviewIcon from '@mui/icons-material/Pageview';
import ArrowBottomIcon from "../Icon/ArrowBottomIcon";
const productsModel = [
    {
        id: '',
        productName: "",
        productUrl: "",
        productPrice: '',
        productCode: ""
    },
]

let userPicUrl:any;
let file:any;
type SomeComponentProps = RouteComponentProps;


const listShowCategory=[
    {value: '', label: '', disabled: true},
    {label:"دیجیتال",value:'DIGITAL'},
    {label:"مد و لباس",value:"FASHION"},
    {label:"زیبایی و سلامت",value:'BEAUTY'},
    {label:"خانه و آشپزخانه",value:"HOME"},
    {label:"فرهنگ و هنر",value:"ART"},
    {label:"سایر",value:"OTHER"}
]
const CreateProduct: FC<SomeComponentProps> = ({ history }) => {

    const [productName, setProductName] = useState<any>();
    const [productLink, setProductLink] = useState<any>();
    const [productPrice, setProductPrice] = useState<any>();
    const [productPriceRial, setProductPriceRial] = useState<any>();
    const [productUrl, setProductUrl] = useState<any>();
    const [productCategory, setProductCategory] = useState<any>("");
    const [formData, setFormData] = useState(new FormData());
    const [changeImg,setChangeImg]=useState(false)
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState(true);
    const [error,setError]=useState<boolean>()
    const {state} = useLocation();
    const token =  Cookies.get("token")
    const location = useLocation();
    // @ts-ignore
    const { productCode } = location.state || { productCode: "none" };
    const productsData = async (productCode:any) => {
    
        axios.get(`?id=${productCode}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'X-Requested-With': 'fetch'
            }
        })
            .then((res) => {
                setProductName(res.data.productName)
                const updatedImageUrl = `${res.data.productUrl }?v=${new Date().getTime()}`;
                setProductPriceRial(res.data.productPrice.toLocaleString('en-US'))
                setProductPrice(res.data.productPrice)
                setProductUrl(updatedImageUrl )
                setProductLink(res.data.productLink)
                setProductCategory(res.data.productCategory)



            })
            .catch((err: any) => {
                console.log(err)

            })
    };
    useEffect(()=>{
        if (productCode!=="none"){
            productsData(productCode)
            setEdit(false)
        }
            },[])

    let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(productCode==="none"){
            try {
                let res = await fetch(``, {
                    
                    method: "POST",
                    body:  JSON.stringify({
                        productName:productName,
                        productLink:productLink,
                        boroliveProductPrice: productPrice===undefined ?0:productPrice,
                        productCategory:productCategory===''?"OTHER":productCategory,

                    }),
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                if (res.status === 200) {
                    const result = await res.json();
                    formData.append('id',result.data.id);
                    try {
                        let res = await fetch("", {
                            method: "POST",
                            body: formData,
                            headers: {
                                'Authorization': 'Bearer ' + token,
                            },
                        });
                        if (res.status === 200) {

                        } else {
                            setError(true)
                            setMessage("عکس محصول ذخیره نشد");
                            

                        }
                    } catch (err) {
                        console.log(err);
                    }
                    setError(false)
                    setMessage("محصول جدید با موفقیت اضافه شد ");
                    setTimeout(function() {
                        setMessage('')
                    }, 3000);
                    setTimeout(function() {
                        history.push("/products" ,);
                    }, 3000);
                } else {
                    setError(true)
                    setMessage("لطفا دوباره تلاش کنید");
                    setTimeout(function() {
                        setMessage('')
                        setProductName("")
                        setProductUrl("")
                        setProductPriceRial('')
                        setProductLink("")
                        setProductPrice('')
                        setProductCategory('')

                    }, 3000);
                }
            } catch (err) {
                console.log(err);
            }

        }else {
            let id=productCode;
             formData.append('id', id);
            if (changeImg){
                try {
                    let res = await fetch(``, {
                        
                        method: "PUT",
                        body:  JSON.stringify({
                            productName:productName,
                            productLink:productLink,
                            boroliveProductPrice: productPrice===undefined ?0:productPrice,
                            productCategory:productCategory===''?"OTHER":productCategory,
                            id:id,

                        }),
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                    if (res.status === 200) {
                        const result = await res.json();
                        formData.append('id',result.data.id);
                        try {
                            let res = await fetch("", {
                                method: "POST",
                                body: formData,
                                headers: {
                                    'Authorization': 'Bearer ' + token,
                                },
                            });
                            if (res.status === 200) {

                            } else {
                                setError(true)
                                setMessage("عکس محصول ذخیره نشد");
                               

                            }
                        } catch (err) {
                            console.log(err);
                        }
                        setMessage("محصول  با موفقیت ویرایش شد ");
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                        setTimeout(function() {
                            history.push("/products" ,);
                        }, 3000);
                    } else if (res.status===404){
                        const result = await res.json();
                        setError(true)
                        setMessage(result.message);
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                    }else {
                        const result = await res.json();
                        console.log(result)
                        setError(true)
                        setMessage("لطفا دوباره تلاش کنید");
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                    }
                } catch (err) {
                    console.log(err);
                }
            }else {
                try {
                    let res = await fetch(``, {
                      
                        method: "PUT",
                        body:  JSON.stringify({
                            productName:productName,
                            productLink:productLink,
                            boroliveProductPrice: productPrice===undefined ?0:productPrice,
                            productCategory:productCategory===''?"OTHER":productCategory,
                            id:id,

                        }),
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                    if (res.status === 200) {

                        setMessage("محصول  با موفقیت ویرایش شد ");
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                        setTimeout(function() {
                            history.push("/products" ,);
                        }, 3000);
                    } else if (res.status===404){
                        const result = await res.json();
                        setError(true)
                        setMessage(result.message);
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                    }else {
                        const result = await res.json();
                        console.log(result)
                        setError(true)
                        setMessage("لطفا دوباره تلاش کنید");
                        setTimeout(function() {
                            setMessage('')
                        }, 3000);
                    }
                } catch (err) {
                    console.log(err);
                }
            }

}

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ):any=> {

      
        file = e.target.files[0];
        if (file) {
            const imageUrl = (window.URL ? URL : webkitURL).createObjectURL(file);
            setProductUrl(imageUrl)
        }
       

        const formData1 = new FormData();
        formData1.append("file", file)
        setFormData(formData1);
        setChangeImg(true)

    };
    const productsDelete = async (productId:any) => {
       
        axios.delete(`?id=${productId}`, {
            headers: {
                'Authorization': 'Bearer ' + token,

            }
        })
            .then((res) => {
                
                setTimeout(function() {
                    history.push("/products" ,);
                }, 2000);

            })
            .catch((err: any) => {
                console.log(err)

            })
    };
    const handelDelet= (e: React.MouseEvent<HTMLButtonElement>, productId: undefined)=>{
        e.preventDefault()
        productsDelete(productId)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue
        inputValue = event.target.value.replace(/,/g, '');
        // @ts-ignore
        if (inputValue === '' || isNaN(inputValue)) {
        } else {
            inputValue = parseFloat(inputValue);
        }
        const formattedValue = inputValue.toLocaleString('en-US');
        setProductPrice(event.target.value.replace(/,/g, ''))
        setProductPriceRial(formattedValue)
    };

const isDisabled =()=>{
       if(productName && productUrl){
           return false
       }else {
           return true
       }
}
    function formatPrice(price: number): string {
        const priceInToman = price / 1000;
        return priceInToman.toLocaleString('fa-IR');
    }



    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
               
                <div className="row justify-content-start">
                    <div className="col-12 col-md-4 ">
                        <p className={"inpLabel"} style={{display:"block"}}>عکس محصول</p>
                        <label htmlFor="file">   <Avatar
                            alt=""
                            src={productUrl}
                            sx={{ width:100, height: 100 }}
                            style={{borderRadius:4}}
                       >
                            <PageviewIcon style={{fontSize:80}}/>
                        </Avatar></label>
                        <input type={"file"} id="file" name="file"
                               accept=".jpg, .jpeg, "
                                  onChange={(e) => handleChange(e)}  hidden/>
                    </div>
                </div>
                <div className="row justify-content-start">
                    <div className="col-12 col-md-4 ">
                       

                        <label className={"inpLabel"}>نام محصول </label>

                        <input
                            className={"inpStyle"}
                            maxLength={40}
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-md-4 ">
                     

                        <label className={"inpLabel"}>قیمت محصول(ریال) </label>

                        <input
                            className={"inpStyle"}
                            maxLength={40}
                            type="text"
                            value={productPriceRial}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <div className="row">
                        <div className="col-12 col-md-4 ">
                         
                            <label className={"inpLabel"}>لینک محصول </label>

                            <input
                                className={"inpStyle"}
                                
                                type="text"
                                value={productLink}

                                onChange={(e) => setProductLink(e.target.value)}
                            />
                        </div>
                    <div className="col-12 col-md-4 " dir="rtl">
                        <label className={"inpLabel"}>دسته بندی محصول</label>
                        <select className="form-control inpStyle" onChange={(e) => setProductCategory(e.target.value)}  value={productCategory}>
                            {
                                listShowCategory.map(
                                    listShowCategory => {
                                        return (
                                            <option value={listShowCategory.value}
                                                    disabled={listShowCategory.disabled}>{listShowCategory.label}</option>
                                        )
                                    }
                                )
                            }

                        </select>
                        <div className="iconSelect">
                            <ArrowBottomIcon></ArrowBottomIcon>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4 ">
                        <button
                             disabled={isDisabled()} className={'submit'}
                             type="submit" style={{display: edit ? 'block' : 'none' }}
                            >
                            افزودن محصول</button>
                        <button
                            disabled={isDisabled()} className={'submit'} type="submit" style={{display: edit ? 'none' : 'block' }}
                        >
                            ویرایش محصول</button>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <button
                             className={'deleteBtn'} onClick={(e)=>handelDelet(e,productCode)} style={{display: edit ? 'none' : 'block' }}
                        >
                            حذف محصول</button>

                    </div>

                </div>

                <div className={"message"} style={{display: message ? 'block' : 'none' }}>
                    <div className={error?" errorMassage":"successfulMassage"}>{message ? <p>{message}</p> : null}</div>
                </div>

            </form>

        </div>
    );
}

export default CreateProduct;