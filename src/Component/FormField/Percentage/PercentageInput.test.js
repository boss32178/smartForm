import PercentageInput from './PercentageInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const mockTryGetValue = jest.fn(() => false);

describe('<PercentageInput/>', () => {
    it('renders 1 <PercentageInput/>> component', () => {
        const component = shallow(<PercentageInput name={"test"}/>);
        expect(component).toHaveLength(1);
    });

    it('renders input field correctly', () => {
        const component = shallow(<PercentageInput isLocked={false} onFocus={mockTryGetValue} name={"test"} value={"91"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('91');

    });
    it('onChange change 91 to 55', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={"91"} />);

        const input = component.find('input');
        input.instance().value = "55";
        input.simulate('change')
        expect(input.instance().value).toEqual('55');
        expect(input.instance().value).not.toEqual('91');

        component.unmount();
    });
    it('onChange validate 45t.76*64 to 45.7664 | only accepts numerical digits and a decimal', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={"91"} />);

        const input = component.find('input');
        input.instance().value = "45t.7664";
        input.simulate('change')
        expect(input.instance().value).toEqual('45.7664');
        expect(input.instance().value).not.toEqual('91');

        component.unmount();
    });
    it('onChange validate 45.76.64 to 45.76 | only accepts 1 decimal', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "45.76.64";
        input.simulate('change')
        expect(input.instance().value).toEqual('45.76');
        expect(input.instance().value).not.toEqual('91');

        component.unmount();
    });
    it('onBlur validate 100.0000 to 100 | removes trailing zeros on blur', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={"91"} />);

        const input = component.find('input');
        input.instance().value = "100.0000";
        input.simulate('blur')
        expect(input.instance().value).toEqual('100');
        expect(input.instance().value).not.toEqual('91');

        component.unmount();
    });
    it('onChange validate 455.7664 to return 45 | only allow max of 100', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "455.7664 ";
        input.simulate('change')
        expect(input.instance().value).toEqual('45');
        expect(input.instance().value).not.toEqual('455.7664');

        component.unmount();
    });
    it('onChange validate 91.7664567 to 91.7664 | only 4 decimal values', () => {
        const component = mount(<PercentageInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "91.7664567";
        input.simulate('change')
        expect(input.instance().value).toEqual('91.7664');
        expect(input.instance().value).not.toEqual('91');

        component.unmount();
    });
});