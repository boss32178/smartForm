import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import '../../css/flex.css';
import FormHeader from '../FormHeader/FormHeader';
import FormFooter from '../FormFooter/FormFooter';
import FormSection from '../FormSection/FormSection';
import SearchInput from '../FormField/Search/SearchInput';
import styles from './SmartForm.module.css';



const SmartForm = props => {
    const [isLocked, setLocked] = useState(true);
    const baseUrl = window.location.origin;
    const [dealerInfo, setDealerInfo] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        fax: ''
      });
    const searchURL = `${baseUrl}/app/dealer/lookup`;
    const fetchedData = {
        customer_first_name:"Tester1",
        provider_contract_num:"",
        customer_zip_code:"45675",
        contract_price:"260.00",
        contract_odometer:"2500",
        cancel_odometer:"110000",
        product_type_code:"2",
        gross_refund_variance:"",
        errors:[]
      };
      
    const providerData = [];
    const productTypeData = [];
    const stateData = [];
    const resolutionTypeData = [];
    const payeeData = [
        { label: " ", value: null },
        { label: "Dealer", value: "Dealer" },
        { label: "Lender", value: "Lender" },
        { label: "Other", value: "Other" },
    ];

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
            zip: newDealer.zip_code,
            fax: newDealer.fax
          });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var data = document.querySelectorAll("[name^=input_]");
        let retrunData = new FormData();

        for (let name of data.keys()) {
            let parsedValue = data[name].value;
            let parsedName = data[name].name;

            parsedName = parsedName.replace("input_", "");
            if (fetchedData[parsedName] !== parsedValue){
                retrunData.set(parsedName, parsedValue);
            }   
        }
    }

    const handleSetLocked = () => {
        setLocked(!isLocked);
    }



    return (
        <>
            <div>
                <FormHeader />
                <form>
                    <div className="flex wrap">
                        <FormSection headerName="Customer Information">
                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={""} name={"input_lender_account_number"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Account #" />

                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={""} name={"input_lender_account_tag"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Echo ID" />

                            <div className={`flex ${styles.flexLabel}`}>
                                <span className={`flex align-center ${styles.inputLabel}`}>Customer</span>
                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={fetchedData.customer_first_name} name={"input_customer_first_name"}
                                    onSetLocked={handleSetLocked} isLockable={true} hasSecondLine={false} labelTagClass="flex-filler" />
                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_customer_last_name"}
                                    onSetLocked={handleSetLocked} isLockable={true} hasSecondLine={false} labelTagClass="flex-filler" />
                            </div>

                            <div className={`flex ${styles.flexLabel}`}>
                                <span className={`flex align-center ${styles.inputLabel}`}>CoCustomer</span>
                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_cobuyer_first_name"}
                                    onSetLocked={handleSetLocked} isLockable={true} hasSecondLine={false} labelTagClass="flex-filler" />
                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_cobuyer_last_name"}
                                    onSetLocked={handleSetLocked} isLockable={true} hasSecondLine={false} labelTagClass="flex-filler" />
                            </div>

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_customer_street_address"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Street" />

                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={""} name={"input_customer_city"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="City" />

                            <div className={`flex ${styles.flexLabel}`}>
                                <span className={`flex align-center ${styles.inputLabel}`}>State / Zip</span>
                                <FormField isLocked={isLocked} fieldType={"DropDown"} value={'1'} dataList={stateData}
                                    name={"input_customer_state"} onSetLocked={handleSetLocked} isLockable={true} hasSecondLine={false} labelTagClass={`flex-filler ${styles.smallerInput}`} />
                                <FormField isLocked={isLocked} fieldType={"Zip"} value={fetchedData.customer_zip_code} name={"input_customer_zip_code"}
                                    onSetLocked={handleSetLocked} isLockable={true} inputWidthClass={styles.largerInput} hasSecondLine={false} labelTagClass="flex-filler" />
                            </div>
                        </FormSection>

                        <FormSection headerName="Product Information">
                            <FormField isLocked={isLocked} fieldType={"DropDown"} value={'1'} dataList={providerData}
                                name={"input_provider_id"} onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Provider" />

                            <FormField isLocked={isLocked} fieldType={"DropDown"} value={fetchedData.product_type_code} dataList={productTypeData}
                                name={"input_product_type_code"} onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Product Type" />

                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={""} name={"input_contract_term"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Contract Term" />

                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={fetchedData.contract_odometer} name={"input_contract_odometer"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Contract Odometer" />


                            <FormField isLocked={isLocked} fieldType={"Currency"} value={fetchedData.contract_price} name={"input_contract_price"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Contract Price" />

                            <FormField fieldType={"Calendar"} value={""} name={"input_contract_date"} labelTagClass=""
                                labelText="Contract Date" labelClass={styles.captionControl} optionalClass=""
                                onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked} />
                        </FormSection>
                    </div>

                    <div className="flex wrap">
                        <FormSection headerName="Dealer Information">
                            <SearchInput value={''} name={"input_dealer_id"} 
                                searchList={searchData} url={searchURL} onUpdateDealer={handleUpdateDealer}
                                onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked}
                                labelText="Lookup Dealer" labelClass={styles.inputLabel} hasSecondLine={false}/>

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={dealerInfo.name} name={"input_dealer_name"}
                                onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} labelTagClass="" labelText="Dealer Name" />

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={dealerInfo.street} name={"input_dealer_street_address"}
                                onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} labelTagClass="" labelText="Street" />

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={dealerInfo.city} name={"input_dealer_city"}
                                onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} labelTagClass="" labelText="City" />

                            <div className={`flex ${styles.flexLabel}`}>
                                <span className={`flex align-center ${styles.inputLabel}`}>State / Zip</span>
                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={dealerInfo.state} dataList={stateData}
                                    name={"input_dealer_state"} onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} hasSecondLine={false} labelTagClass={`flex-filler ${styles.smallerInput}`} />
                                <FormField fieldType={"Zip"} value={dealerInfo.zip} name={"input_dealer_zip_code"}
                                    onSetLocked={handleSetLocked} isLockable={false} isDisabled={true} inputWidthClass={styles.largerInput} hasSecondLine={false} labelTagClass="flex-filler" />
                            </div>

                            <FormField isLocked={isLocked} fieldType={"Phone"} value={dealerInfo.fax} name={"input_dealer_fax"}
                                onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} labelTagClass="" labelText="Fax" />
                        </FormSection>


                        <FormSection headerName="Vehicle Information">
                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_vehicle_vin"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="VIN" />

                            <FormField isLocked={isLocked} fieldType={"Numeric"} value={""} name={"input_year"}
                                onSetLocked={handleSetLocked} isLockable={true} max={4} labelTagClass="" labelText="Year" />

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_make"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Make" />

                            <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_model"}
                                onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Model" />
                        </FormSection>
                    </div>

                    

                    <FormSection headerName="Cancellation Information" >
                        <div className="flex wrap">
                            <div className={`flex-filler ${styles.flexCancelColLeft}`}>


                                <FormField fieldType={"DropDown"} value={'1'} dataList={resolutionTypeData}
                                    name={"input_resolution_code"} onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" labelText="Resolution Type" />

                                <FormField isLocked={isLocked} fieldType={"DropDown"} value={'1'} dataList={payeeData}
                                    name={"input_cancel_type_code"} onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Cancel Type" />

                                <FormField fieldType={"Calendar"} value={""} name={"input_lender_cancel_date"} labelTagClass=""
                                    labelText="Lender Cancel Date" labelClass={styles.captionControl} optionalClass=""
                                    onSetLocked={handleSetLocked} isLockable={true} isLocked={isLocked} />

                                <FormField isLocked={isLocked} fieldType={"Currency"} value={""} name={"input_estimated"}
                                    onSetLocked={handleSetLocked} isDisabled={true} isLockable={true} labelTagClass="" helpText="Estimate calculated using pro rata less an estimated $25.00 cancel fee" labelText="Refund Estimate" />
                            </div>

                            <div className={`flex-filler ${styles.flexCancelColRight}`}>
                                <FormField fieldType={"Textbox"} value={""} name={"input_resolution_text"}
                                    onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" labelText="Resolution Description" />

                                <FormField isLocked={isLocked} fieldType={"Numeric"} value={fetchedData.cancel_odometer} name={"input_cancel_odometer"}
                                    onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Cancel Odometer" />

                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={""} name={"input_cancellation_send_date"}
                                    onSetLocked={handleSetLocked} isDisabled={true} isLockable={true} labelTagClass="" labelText="Cancellation Sent" />

                                <FormField isLocked={isLocked} fieldType={"Textbox"} value={fetchedData.provider_contract_num} name={"input_provider_contract_num"}
                                    onSetLocked={handleSetLocked} isLockable={true} labelTagClass="" labelText="Provider Contract Number" />
                            </div>
                        </div>
                    </FormSection>

                    <div className="flex wrap">
                        <FormSection headerName="Refund Information">
                            <FormField fieldType={"Calendar"} value={""} name={"input_provider_cancel_date"} labelTagClass=""
                                labelText="Provider Cancel Date" labelClass={styles.captionControl} optionalClass=""
                                onSetLocked={handleSetLocked} isLockable={false}
                                helpText="Date the cancellation was processed in the provider's system" />

                            <FormField fieldType={"Currency"} value={""} name={"input_total_due"}
                                onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" optionalClass={styles.boldValue} labelClass={styles.boldLabel} helpText="Refund amount due to the consumer as determined by the provider" labelText="Refund Due" />

                            <FormField fieldType={"Currency"} value={""} name={"input_provider_cancel_fee"}
                                onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" helpText="Cancellation fee as determined by the provider" labelText="Cancel Fee" />

                            <FormField fieldType={"Percentage"} value={""} name={"input_provider_cancel_factor"}
                                onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" helpText="Cancellation percentage as determined by the provider" labelText="Cancellation Percentage" />

                            <FormField isLocked={isLocked} fieldType={"Currency"} value={""} name={"input_refund_variance"}
                                onSetLocked={handleSetLocked} isDisabled={true} isLockable={false} labelTagClass="" optionalClass={styles.boldValue} helpText="Absolute difference between Refund Estimate and Refund Due" labelClass={styles.boldLabel} labelText="Refund Variance" />
                        </FormSection>

                        <FormSection headerName="Payment Information">
                            <FormField fieldType={"DropDown"} value={'1'} dataList={payeeData}
                                name={"input_payee_1"} onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" labelText="Payee" />

                            <FormField fieldType={"Currency"} value={""} name={"input_paid_amount_1"}
                                onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" labelText="Amount Paid" />

                            <FormField fieldType={"Calendar"} value={""} name={"input_paid_date_1"} labelTagClass=""
                                labelText="Date Paid" labelClass={styles.captionControl} optionalClass=""
                                onSetLocked={handleSetLocked} isLockable={false} />

                            <FormField fieldType={"Numeric"} value={""} name={"input_paid_refnum_1"}
                                onSetLocked={handleSetLocked} isLockable={false} labelTagClass="" labelText="Reference Number" />

                        </FormSection>

                    </div>

                    <div className={styles.footer}>
                        <FormFooter handleSubmit={handleSubmit} />
                    </div>
                </form>

            </div>
        </>
    );
}

export default React.memo(SmartForm);



