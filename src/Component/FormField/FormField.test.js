import FormField from './FormField';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);
const testDataList = [
    {label: "Apple", value: 1 }
]

describe('<FormField/>', () => {
    it('renders 1 component', () => {
        const component = shallow(<FormField name={"test"} fieldType={"Numeric"}/>);
        expect(component).toHaveLength(1);
    })
    
/***************************************************************************************************** */
/** Testing Currency component **/

    it('renders Currency component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Currency"} value={"1"} name={"currency"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Currency');
    })

    it('renders Currency input correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Currency"} value={"1"} name={"currency"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} 
                                        labelText="MyCurrencyLabelVal" labelClass="my-class"/>
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('currency');
        expect(input.prop('value')).toEqual('1');

        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(span.hasClass("my-class")).toEqual(true);
        expect(spanVal).toEqual("MyCurrencyLabelVal");
        expect(label).toHaveLength(1);

        component.unmount();

        const component2 = mount(
            <FormField isLocked={false} fieldType={"Currency"} value={"1"} name={"currency"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        const input2 = component2.find('input');
        expect(input2).toHaveLength(1);
        expect(input2.prop('name')).toEqual('currency');
        expect(input2.prop('value')).toEqual('1');
        const label2 = component2.find('label');        
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');
        // console.log('Next Item name = '+nextItem.html());
        // console.log('Next Item name = '+nextItem.type());

        component2.unmount();
    })

/***************************************************************************************************** */
/** Testing Percent component **/

    it('renders Percent component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Percentage"} value={"1"} name={"percentage"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Percentage');
    })

    it('renders Percent field correctly', () => {
        //Test with Label
        const component = mount(
            <FormField isLocked={false} fieldType={"Percentage"} value={"1"} name={"percentage"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} 
                                        labelText={"MyPercent%Label"} labelClass={"my-%-class"}/>
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('percentage');
        expect(input.prop('value')).toEqual('1');

        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyPercent%Label");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-%-class")).toEqual(true);


        component.unmount();

        //Test without label
        const component2 = mount(
            <FormField isLocked={false} fieldType={"Percentage"} value={"1"} name={"percentage"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        const input2 = component2.find('input');
        expect(input2).toHaveLength(1);
        expect(input2.prop('name')).toEqual('percentage');
        expect(input2.prop('value')).toEqual('1');
        const label2 = component2.find('label');     
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');

        component2.unmount();
    })

/***************************************************************************************************** */
/** Testing Zip component **/

    it('renders Phone component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Phone"} value={"1"} name={"phone"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Phone');
    })

    //Test with Label
    it('renders Phone field correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Phone"} value={"1"} name={"phone"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} 
                                        labelText={"MyPhoneLabel"} labelClass={"my-phone"}/>
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('phone');
        expect(input.prop('value')).toEqual('1');

        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyPhoneLabel");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-phone")).toEqual(true);


        component.unmount();
    })

    //Test without Label
    it('renders Phone field correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Phone"} value={"1"} name={"phone"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('phone');
        expect(input.prop('value')).toEqual('1');
        const label = component.find('label');     
        var nextItem = label.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');

        component.unmount();
    })

/***************************************************************************************************** */
/** Testing Zip component **/

    it('renders Zip component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Zip"} value={"1"} name={"zip"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Zip');
    })

    it('renders Zip field correctly', () => {
        //Test with Label
        const component = mount(
            <FormField isLocked={false} fieldType={"Zip"} value={"1"} name={"zip"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} 
                                        labelText={"MyZipLabel"} labelClass={"my-zip"}/>
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('zip');
        expect(input.prop('value')).toEqual('1');

        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyZipLabel");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-zip")).toEqual(true);


        component.unmount();

        // Test wihtout Label
        const component2 = mount(
            <FormField isLocked={false} fieldType={"Zip"} value={"1"} name={"zip"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        const input2 = component2.find('input');
        expect(input2).toHaveLength(1);
        expect(input2.prop('name')).toEqual('zip');
        expect(input2.prop('value')).toEqual('1');

        const label2 = component2.find('label');     
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');

        component2.unmount();
    })

/***************************************************************************************************** */
/** Testing Dropdown **/

    it('renders Textbox component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Textbox"} value={"1"} name={"textbox"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Textbox');
    })

    it('renders Textbox field correctly', () => {
        //Test with Label
        const component = mount(
            <FormField isLocked={false} fieldType={"Textbox"} value={"1"} name={"textbox"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} 
                                        labelText={"MyTextboxLabel"} labelClass={"my-textbox"}/>
        );
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('textbox');
        expect(input.prop('value')).toEqual('1');
        
        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyTextboxLabel");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-textbox")).toEqual(true);

        component.unmount();

        // Test without Label
        const component2 = mount(
            <FormField isLocked={false} fieldType={"Textbox"} value={"1"} name={"textbox"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        const input2 = component2.find('input');
        expect(input2).toHaveLength(1);
        expect(input2.prop('name')).toEqual('textbox');
        expect(input2.prop('value')).toEqual('1');        
        const label2 = component2.find('label');     
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');

        component2.unmount();
    })


/***************************************************************************************************** */
/** Testing Dropdown **/

    it('renders Numeric component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"Numeric"} value={"1"} name={"numeric"} 
                                        onSetLocked={mockTryGetValue} isLockable={true} />
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('Numeric');
    })

    it('renders Numeric field correctly', () => {
        // Testing with LabelText
        const component = mount(
            <FormField isLocked={false} fieldType={"Numeric"} value={"1"} name={"numeric"} 
                                onSetLocked={mockTryGetValue} isLockable={true}  
                                labelText={"MyTestNumericLabel"} labelClass={"my-numeric"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('numeric');
        expect(input.prop('value')).toEqual('1');

        const label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyTestNumericLabel");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-numeric")).toEqual(true);


        component.unmount();

        // Testing without LabelText
        const component2 = mount(
            <FormField isLocked={false} fieldType={"Numeric"} value={"1"} name={"numeric"} 
                                onSetLocked={mockTryGetValue} isLockable={true} />);
        const input2 = component2.find('input');
        expect(input2).toHaveLength(1);

        const label2 = component2.find('label');     
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');
        
        component2.unmount();
    });

/***************************************************************************************************** */
/** Testing Dropdown **/

    it('renders DropDown component correctly', () => {
        const component = mount(
            <FormField isLocked={false} fieldType={"DropDown"} value={'1'} dataList={testDataList} 
                            name={"dropdown"} onSetLocked={mockTryGetValue} isLockable={true}/>
        );
        expect(component).toHaveLength(1);
        expect(component.prop('fieldType')).toEqual('DropDown');
    })

    it('renders DropDown field correctly', () => {
        // Test has Label
        const component = mount(
            <FormField isLocked={false} fieldType={"DropDown"} value={'1'} dataList={testDataList} 
                            name={"dropdown"} onSetLocked={mockTryGetValue} isLockable={true} 
                            labelText={"MyDropDownLabel"} labelClass={"my-dropdown"}/>);
        const input = component.find('select');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('dropdown');
        expect(input.prop('value')).toEqual('1');

        var label = component.find('label');
        var span = label.find('span').first();
        var spanVal = span.text();
        expect(spanVal).toEqual("MyDropDownLabel");
        expect(label).toHaveLength(1);
        var spanVal = span.text();
        expect(span.hasClass("my-dropdown")).toEqual(true);
        
        component.unmount();

        // Test without Label
        const component2 = mount(
            <FormField isLocked={false} fieldType={"DropDown"} value={'1'} dataList={testDataList} 
                            name={"dropdown"} onSetLocked={mockTryGetValue} isLockable={true}/>);
        const input2 = component2.find('select');
        expect(input2).toHaveLength(1);
        expect(input2.prop('name')).toEqual('dropdown');
        expect(input2.prop('value')).toEqual('1');

        const label2 = component2.find('label');     
        var nextItem = label2.children();
        expect(nextItem.type()).not.toEqual('span');
        expect(nextItem.type()).toEqual('div');

        component2.unmount();
    });

});

