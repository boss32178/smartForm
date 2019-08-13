import PhoneInput from './PhoneInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const mockTryGetValue = jest.fn(() => false);

describe('<PhoneInput/>', () => {
    it('renders 1 <PhoneInput/>> component', () => {
        const component = shallow(<PhoneInput name={"test"}/>);
        expect(component).toHaveLength(1);
    });

    it('renders input field correctly', () => {
        const component = shallow(<PhoneInput isLocked={false} onFocus={mockTryGetValue} name={"test"} value={"(214) 333-3333"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('(214) 333-3333');

    });
    it('onChange change (214) 333-3333 to (214) 444-4444', () => {
        const component = mount(<PhoneInput name={"test"} onFocus={mockTryGetValue} value={"(214) 333-3333"} />);

        const input = component.find('input');
        input.instance().value = "(214) 444-4444";
        input.simulate('change')
        expect(input.instance().value).toEqual('(214) 444-4444');
        expect(input.instance().value).not.toEqual('(214) 333-3333');

        component.unmount();
    });
    it('onChange validate 1112223333444 to (111) 222-3333 | only takes in 10 digits', () => {
        const component = mount(<PhoneInput name={"test"} onFocus={mockTryGetValue} value={"(214) 333-3333"} />);

        const input = component.find('input');
        input.instance().value = "1112223333444";
        input.simulate('change')
        expect(input.instance().value).toEqual('(111) 222-3333');
        expect(input.instance().value).not.toEqual('(214) 333-3333');

        component.unmount();
    });
    it('onChange validate 214az*777-7777 to (214) 777-7777 | only accepts numerical digits', () => {
        const component = mount(<PhoneInput name={"test"} onFocus={mockTryGetValue} value={"(214) 333-3333"} />);

        const input = component.find('input');
        input.instance().value = "214az*777-7777";
        input.simulate('change')
        expect(input.instance().value).toEqual('(214) 777-7777');
        expect(input.instance().value).not.toEqual('(214) 333-3333');

        component.unmount();
    });
    it('onChange validate 2145555555 to (214) 555-5555 | formats number on change', () => {
        const component = mount(<PhoneInput name={"test"} onFocus={mockTryGetValue} value={"(214) 333-3333"} />);

        const input = component.find('input');
        input.instance().value = "2145555555";
        input.simulate('change')
        expect(input.instance().value).toEqual('(214) 555-5555');
        expect(input.instance().value).not.toEqual('(214) 333-3333');

        component.unmount();
    });
});