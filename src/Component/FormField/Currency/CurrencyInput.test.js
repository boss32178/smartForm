import CurrencyInput from './CurrencyInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => true);

describe('<CurrencyInput/>', () => {
    it('renders 1 component', () => {
        const component = shallow(<CurrencyInput name={"test"}  onFocus={mockTryGetValue}/>);
        expect(component).toHaveLength(1);

    })
    it('renders input field correctly', () => {
        const component = shallow(<CurrencyInput isLoked={false}  onFocus={mockTryGetValue} name={"test"} value={"125"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('125');
    })
    it('onblur format 1123 to 1,123.00', () => {
        const component = mount(<CurrencyInput name={"test"} onFocus={mockTryGetValue} value={"125"} />);

        const input = component.find('input');
        input.instance().value = "1123";
        input.simulate('blur')
        expect(input.instance().value).toEqual('1,123.00');
        expect(input.instance().value).not.toEqual('125');

        component.unmount();
    });
    it('onChange validat 123t.213 to 123.21', () => {
        const component = mount(<CurrencyInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "123t.213";
        input.simulate('change')
        expect(input.instance().value).toEqual('123.21');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange validat 123.210.33 to 123.21', () => {
        const component = mount(<CurrencyInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "123.210.33";
        input.simulate('change')
        expect(input.instance().value).toEqual('123.21');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange validat 123456789.21 to 1234567.21', () => {
        const component = mount(<CurrencyInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "123456789.21";
        input.simulate('change')
        expect(input.instance().value).toEqual('1234567.21');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });

});