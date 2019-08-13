import NumericInput from './NumericInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);

describe('<NumericInput/>', () => {
    it('renders 1 component', () => {
        const component = shallow(<NumericInput name={"test"}/>);
        expect(component).toHaveLength(1);
    });
    it('renders input field correctly', () => {
        const component = shallow(<NumericInput isLoked={false}  onFocus={mockTryGetValue} name={"test"} value={"125"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('125');

    });
    it('onChange change 125 to 1123', () => {
        const component = mount(<NumericInput name={"test"} onFocus={mockTryGetValue} value={"125"} />);

        const input = component.find('input');
        input.instance().value = "1123";
        input.simulate('change')
        expect(input.instance().value).toEqual('1123');
        expect(input.instance().value).not.toEqual('125');

        component.unmount();
    });
    it('onChange validat 123t.213 to 123213', () => {
        const component = mount(<NumericInput name={"test"} onFocus={mockTryGetValue} value={"125"} />);

        const input = component.find('input');
        input.instance().value = "123t.213";
        input.simulate('change')
        expect(input.instance().value).toEqual('123213');
        expect(input.instance().value).not.toEqual('125');

        component.unmount();
    });
    it('onChange validat 123.210.33 to 12321033', () => {
        const component = mount(<NumericInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "123.210.33";
        input.simulate('change')
        expect(input.instance().value).toEqual('12321033');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange validat 123456789.21 to 123456721', () => {
        const component = mount(<NumericInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "123456789.21";
        input.simulate('change')
        expect(input.instance().value).toEqual('12345678921');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
});