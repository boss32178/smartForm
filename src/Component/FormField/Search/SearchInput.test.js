import SearchInput from './SearchInput';
import React from 'react';
import Enzyme, { shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() })
const mockTryGetValue = jest.fn(() => false);
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
const badSearchData = {
  status: "success",
  total: 3,
}
const emptySearchData = {
  dealers: [],
  status: "success",
  total: 3,
}

describe('<SearchInput/>', () => {
  it('renders 1 component', () => {
      const component = shallow(<SearchInput onFocus={mockTryGetValue} name={"test"} onUpdateDealer={mockTryGetValue} />);
      expect(component).toHaveLength(1);
  })
  it('renders input field correctly', () => {
      const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" onUpdateDealer={mockTryGetValue} />);

      const input = component.find('input');
      input.instance().value = "i like dogs";
      input.simulate('change')
      expect(input.prop('name')).toEqual('test');
      expect(input.instance().value).toEqual('i like dogs');

      component.unmount();

  })
  it('renders correctly with bad data from api call', () => {
      const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" onUpdateDealer={mockTryGetValue} />);

      const input = component.find('input');
      input.instance().value = "i like dogs";
      input.simulate('change')

      const text = component.find('label > div > span > div > div:first-child').text();
      expect(text).toEqual('Error searching results')

      component.unmount();

  })
  it('renders No results found correctly', () => {
    const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={searchData} onUpdateDealer={mockTryGetValue} />);

    const input = component.find('input');
    input.instance().value = "i like dogs";
    input.simulate('change')

    const text = component.find('label > div > span > div > div:first-child').text();
    expect(text).toEqual('No results found')

    component.unmount();

  })
  it('renders found data correctly search text = test', async () => {
      const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={searchData} onUpdateDealer={mockTryGetValue} /> );

      const input = component.find('input');
      input.instance().value = "test";
      input.simulate('change')

      const text = component.find('label > div > span > div > div:first-child').text();
      expect(text).toEqual('100002 - Test Dealer 1124 South Street, Sicklerville, NJ')

      component.unmount();

  })
  it('renders found data correctly search text = SOU', async () => {
      const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={searchData} onUpdateDealer={mockTryGetValue} /> );

      const input = component.find('input');
      input.instance().value = "SOU";
      input.simulate('change')

      const text = component.find('label > div > span > div > div:first-child').text();
      expect(text).toEqual('100002 - Test Dealer 1124 South Street, Sicklerville, NJ')

      component.unmount();
  })
  it('renders correctly with bad data', async () => {
    const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={badSearchData} onUpdateDealer={mockTryGetValue} /> );

    const input = component.find('input');
    input.instance().value = "SOU";
    input.simulate('change')

    const text = component.find('label > div > span > div > div:first-child').text();
    expect(text).toEqual('No results found')

    component.unmount();

  })
  it('renders correctly with empty data object', async () => {
    const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={emptySearchData} onUpdateDealer={mockTryGetValue} /> );

    const input = component.find('input');
    input.instance().value = "SOU";
    input.simulate('change')

    const text = component.find('label > div > span > div > div:first-child').text();
    expect(text).toEqual('No results found')

    component.unmount();

  })
  it('renders correctly with only a string length of 2 "th"', async () => {
    const component = mount(<SearchInput isLocked={false}  onFocus={mockTryGetValue} name={"test"} value="" searchList={searchData} onUpdateDealer={mockTryGetValue} /> );

    const input = component.find('input');
    input.instance().value = "th";
    input.simulate('change')

    expect(component.find('label > div > span > div > div:first-child')).toHaveLength(0);

    component.unmount();

  })
    
});