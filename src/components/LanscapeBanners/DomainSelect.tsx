import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { countryDomains } from '../../utils/countryList';
import Image from 'next/image';
import { PageContext } from '@/context/PageContext';
import {useContext} from 'react';
import {PageView} from '@/utils/enums';
type Props = {
  domain: string;
  setDomain: (domain: string) => void;
};

export default function DomainSelect({ domain, setDomain }: Props) {
console.log(domain, ' this is domain');

    const { page } = useContext(PageContext);
  const onChange = (code: string) => setDomain(code);
  return (
    <Listbox value={domain} onChange={onChange}>
      <div className={`relative  ${page ===PageView.STEP2VIEW && "text-customPurple font-bold "}`}>
        <Listbox.Button className=" relative w-full cursor-default rounded-full bg-white px-4  py-[6px] ">
          <div className="flex space-x-2">
            <Image
              src="/landscapeIcons/googleIcon.svg"
              width={22}
              height={22}
              alt="mobileIcon"
            />
            <span className="block truncate">{domain}</span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {countryDomains.map((countryDomain, key) => (
              <Listbox.Option
                key={key}
                className={({ active }) =>
                  `relative cursor-default  select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-customBlue' : 'text-gray-900'
                  }`
                }
                value={countryDomain}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {countryDomain}
                    </span>
                    {/* {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <Image
                          src="/landscapeIcons/googleIcon.svg"
                          width={25}
                          height={25}
                          alt="mobileIcon"
                        />
                      </span>
                    ) : null} */}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
