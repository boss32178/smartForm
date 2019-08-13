import ZipInput from './ZipInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const mockTryGetValue = jest.fn(() => false);

describe('<ZipInput/>', () => {
    it('renders 1 <ZipInput/>> component', () => {
        const component = shallow(<ZipInput name={"test"}/>);
        expect(component).toHaveLength(1);
    });

    it('renders input field correctly', () => {
        const component = shallow(<ZipInput isLocked={false} onFocus={mockTryGetValue} name={"test"} value={"55555-4444"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('55555-4444');

    });
    it('onChange change 55555-4444 to 22222-3333', () => {
        const component = mount(<ZipInput name={"test"} onFocus={mockTryGetValue} value={"55555-4444"} />);

        const input = component.find('input');
        input.instance().value = "22222-3333";
        input.simulate('change')
        expect(input.instance().value).toEqual('22222-3333');
        expect(input.instance().value).not.toEqual('55555-4444');

        component.unmount();
    });
    it('onChange change 55yr555-44!44 to 55555-4444 | only takes in digits', () => {
        const component = mount(<ZipInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "55yr555-44!44";
        input.simulate('change')
        expect(input.instance().value).toEqual('55555-4444');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange change 55-5554444 to 55555-4444', () => {
        const component = mount(<ZipInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "55-5554444";
        input.simulate('change')
        expect(input.instance().value).toEqual('55555-4444');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange validate 55533-432533 to return 55533-4325 | only allow 4 digits after hypen', () => {
        const component = mount(<ZipInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "55533-432533 ";
        input.simulate('change')
        expect(input.instance().value).toEqual('55533-4325');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
    it('onChange validate 555-33-43253-65 to 55533-4325', () => {
        const component = mount(<ZipInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "555-33-43253";
        input.simulate('change')
        expect(input.instance().value).toEqual('55533-4325');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
});