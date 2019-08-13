import DropDownInput from './DropDownInput';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);
const testDataList = [
    {label: "Apple", value: 1 }
]

describe('<DropDownInput/>', () => {
    it('renders 1 component', () => {
        const component = shallow(<DropDownInput name={"test"} dataList={testDataList} />);
        expect(component).toHaveLength(1);
    })
    it('renders input field correctly', () => {
        const component = shallow(
            <DropDownInput isLoked={false}  onFocus={mockTryGetValue} name={"test"} value={"1"} 
                        dataList={testDataList} />
        );
        const input = component.find('select');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('1');

    })
    it('renders input field with no data list', () => {
        const component = shallow(
            <DropDownInput isLoked={false}  onFocus={mockTryGetValue} name={"test"} value={"1"} />
        );
        const input = component.find('select');
        expect(input).toHaveLength(1);
        expect(input.prop('name')).toEqual('test');
        expect(input.prop('value')).toEqual('1');
    })
});