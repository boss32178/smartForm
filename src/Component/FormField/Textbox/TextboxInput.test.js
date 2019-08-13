import TextboxInput from './TextboxInput';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const mockTryGetValue = jest.fn(() => false);

describe('<TextboxInput/>', () => {
    it('renders 1 <TextboxInput/>> component', () => {
        const component = shallow(<TextboxInput name={"test"}/>);
        expect(component).toHaveLength(1);
    });

    it('renders input field correctly', () => {
        const component = shallow(<TextboxInput isLocked={false} onFocus={mockTryGetValue} name={"test"} value={"i like cats"}/>);
        const input = component.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('text');
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('i like cats');

    });
    it('onChange change i like cats to i like cats!@9 | accepts all types of characters', () => {
        const component = mount(<TextboxInput name={"test"} onFocus={mockTryGetValue} value={"i like cats"} />);

        const input = component.find('input');
        input.instance().value = "i like cats!@9";
        input.simulate('change')
        expect(input.instance().value).toEqual('i like cats!@9');
        expect(input.instance().value).not.toEqual('i like cats');

        component.unmount();
    });
    it('onChange only allows props max (45) characters', () => {
        const component = mount(<TextboxInput name={"test"} onFocus={mockTryGetValue} value={""} />);

        const input = component.find('input');
        input.instance().value = "abcdefghijklmnopqrstuvwxyz.123456789!abcdefghij123";
        input.simulate('change')
        expect(input.instance().value).toEqual('abcdefghijklmnopqrstuvwxyz.123456789!abcdefgh');
        expect(input.instance().value).not.toEqual('');

        component.unmount();
    });
});