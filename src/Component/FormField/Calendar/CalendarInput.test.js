import CalendarInput from './CalendarInput';
import React from 'react';
import './../../../General/UnitTestSetup.js'
import Enzyme, { mount, shallow } from 'enzyme';

const mockTryGetValue = jest.fn(() => false);
const mockSetValue = jest.fn((newVal) => this.value = newVal); 

describe('<CalendarInput/>', () => {
    it('renders 1 <CalendarInput/>> component', () => {
        const component = shallow(<CalendarInput name={"test"}/>);
        expect(component).toHaveLength(1);
        const input = component.find('input');
        expect(input.prop("name")).toEqual("test");
    });

    it('renders input field correctly', () => {
        const component = shallow(<CalendarInput isLocked={false} onFocus={mockTryGetValue} name={"test"} value={"2019-02-01"} onChange={mockSetValue}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('2019-02-01');

    });


    it('onChange change 2019-05-02 to 2018-06-12', () => {
        const event = {target: {value: "20180612"}};
        const mockSetValue = jest.fn();    

        const component = mount(
            <CalendarInput name={"test"} onFocus={mockTryGetValue} value={"2019-05-02"} onChange={mockSetValue} />
        );
        const input = component.find('input');
        expect(input.instance().value).toEqual('2019-05-02');   
        

        component.simulate('change', event);

        expect(mockSetValue).toHaveBeenCalledTimes(1);
        expect(mockSetValue.mock.calls[0][0]).toEqual("2018-06-12");  //return the first argument of the first call

        component.unmount();
    });

});