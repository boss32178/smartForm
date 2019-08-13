import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './Form.module.css';
import SearchInput from '../FormField/Search/SearchInput';
import '../../css/flex.css';
import './Form.css';


const Form = props => {
  const [isLocked, setLocked] = useState(false);
  const [dealerInfo, setDealerInfo] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    fax: ''
  });
  const baseUrl = window.location.origin;
  const searchURL = `${baseUrl}/app/dealer/lookup`;
  const fetchedData = {
    customer_first_name:"Tester1",
    customer_phone:"",
    customer_zip_code:"45675",
    contract_price:"260.00",
    contract_odometer:"2500",
    cancel_odometer:"110000",
    product_type_code:"2",
    gross_refund_variance:"",
    errors:[]
};
  const techCompanies = [
    {label: "Apple", value: 1 },
    {label: "Facebook", value: 2 },
    {label: "Netflix", value: 3 },
    {label: "Tesla", value: 4 },
    {label: "Amzon", value: 5 },
    {label: "Alphobet", value: 6 },
  ]

  const returnDealers = [
    {
      business_name: "Test Dealer 1",
      city: "Sicklerville",
      dealer_id: "5213990176136675291",
      dealer_num: "100002",
      display_description: "124 South Street, Sicklerville, NJ",
      display_title: "100002 - Test Dealer 1",
      fax: "855-294-9584",
      state: "NJ",
      street_address: "124 South Street",
      zip_code: "52639"
    },
    {
      business_name: "Test Dealer 2",
      city: "Sicklerville",
      dealer_id: "5213990176136675292",
      dealer_num: "100002",
      display_description: "124 South Street, Sicklerville, NJ",
      display_title: "100002 - Test Dealer 2",
      fax: "855-294-9584",
      state: "NJ",
      street_address: "124 South Street",
      zip_code: "52639"
    },
    {
      business_name: "Test Dealer 3",
      city: "Sicklerville",
      dealer_id: "5213990176136675293",
      dealer_num: "100002",
      display_description: "124 South Street, Sicklerville, NJ",
      display_title: "100002 - Test Dealer 3",
      fax: "855-294-9584",
      state: "NJ",
      street_address: "124 South Street",
      zip_code: "52639"
    }
  ];

  const searchData = {
    dealers: returnDealers,
    status: "success",
    total: 3,
  }
 
  const handleUpdateDealer = (newDealer) => {
    setDealerInfo({
      name: newDealer.display_title,
      street: newDealer.street_address,
      city: newDealer.city,
      state: newDealer.state,
      zip: newDealer.zip,
      fax: newDealer.fax
    });
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let retrunData = new FormData();

    for (let name of data.keys()) {
      let parsedValue = data.get(name);
      if (fetchedData[name] !== parsedValue){
        retrunData.set(name, parsedValue);
      }
    }

  }

  const handleSetLocked = () => {
    setLocked(!isLocked);
  }

  let errorFlag = true;

  return (
    <section className="flex">
        <form className="flex flex-fill column " onSubmit={handleSubmit}>
          
                <FormField  fieldType={"Percentage"} value={""} name={"gross_refund_variance"} tabIndex={1} 
                            labelText="Refund Variance:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked} 
                            hasError={errorFlag}/>

                <FormField  fieldType={"Textbox"} value={fetchedData.customer_first_name} name={"customer_first_name"} tabIndex={2}
                            labelText="Customer First Name:" labelClass={styles.captionControl} 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} 
                            hasError={errorFlag}/>  

                <FormField  fieldType={"Phone"} value={""} name={"customer_phone"} tabIndex={3} 
                            labelText="Customer Phone:" labelClass={styles.captionControl}
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}  
                            errorMessage="There has been an error." helpText="This is my helper text." hasError={errorFlag}/>  

                <FormField  fieldType={"Zip"} value={fetchedData.customer_zip_code} name={"customer_zip_code"} tabIndex={4}
                            labelText="Zip:" labelClass={styles.captionControl} 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}  
                            hasError={errorFlag}/>

                <FormField  fieldType={"Currency"} value={fetchedData.contract_price} name={"contract_price"} tabIndex={5}
                            labelText="Contract Price:" labelClass={styles.captionControl} 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}  
                            hasError={errorFlag}/>  

                <FormField  fieldType={"Numeric"} value={fetchedData.cancel_odometer} name={"cancel_odometer"} tabIndex={6} 
                            labelText="Cancel Odometer:" labelClass={styles.captionControl} 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}  
                            hasError={errorFlag}/>

                <FormField  fieldType={"Numeric"} value={fetchedData.contract_odometer} name={"contract_odometer"} 
                            labelText="Contract Odometer:" labelClass={styles.captionControl} 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked} isDisabled={true} 
                            errorMessage="There has been an error." helpText="This is my helper text." hasError={errorFlag}/>

                <FormField  fieldType={"DropDown"} value={fetchedData.product_type_code} name={"product_type_code"} tabIndex={7} 
                            labelText="Product Type:" labelClass={styles.captionControl} dataList={techCompanies} 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked} 
                            hasError={errorFlag}/>         

                <FormField  fieldType={"Textbox"} value={""} name={"textbox"} tabIndex={8} 
                            labelClass={styles.captionControl} optionalClass="second-input"
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}   
                            errorMessage="There has been an error." helpText="This is my helper text." hasError={errorFlag}/>  

                <FormField  fieldType={"Calendar"} value={""} name={"calendar"} tabIndex={9}
                            labelText="Calendar Picker:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}                              
                            helpText="Date should be in yyyy-mm-dd format." hasError={errorFlag}/>  

                <SearchInput  value={''}  name={"search"} tabIndex={10} 
                              labelText="Search:" labelClass={styles.captionControl} optionalClass="" 
                              searchList={searchData} url={searchURL} onUpdateDealer={handleUpdateDealer}
                              onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} /> 

                <FormField  fieldType={"Textbox"} value={dealerInfo.name}  name={"dealer_name"} 
                            labelText="Dealer Name:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} /> 

                <FormField  fieldType={"Textbox"} value={dealerInfo.street} name={"dealer_street"} 
                            labelText="Street:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} /> 

                <FormField  fieldType={"Textbox"} value={dealerInfo.city} name={"dealer_city"} 
                            labelText="City:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} /> 

                <FormField  fieldType={"Textbox"} value={dealerInfo.state} name={"dealer_state"} 
                            labelText="State:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} /> 

                <FormField  fieldType={"Zip"} value={dealerInfo.state} name={"dealer_zip"} 
                            labelText="Zip:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} /> 

                <FormField  fieldType={"Phone"} value={dealerInfo.fax} name={"dealer_fax"} 
                            labelText="Fax:" labelClass={styles.captionControl} optionalClass="" 
                            onSetLocked={handleSetLocked} isLockable={true}  isLocked={isLocked} isDisabled={true} />  
<br/>
<br/>

          <button className="button"  value="Submit" size="145">Save</button>
        </form>
    </section>
  );
}

export default React.memo(Form);