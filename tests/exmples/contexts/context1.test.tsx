import { StrictMode, useEffect, useRef, useState, useContext, createContext } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { proxy, snapshot, useSnapshot } from 'valtio'
import React from 'react'


describe('context', () => {

    const CounterContext = createContext(null);

    const Component1 = () => {
        const { count, setCount } = useContext(CounterContext);
        return <>
            <div>count: {count}</div>
            <button onClick={() => setCount(n => n + 1)}>parentButton</button>
        </>
    }


    const childRenderFn = vi.fn()

    const Stateless = () => {
        childRenderFn()
        return <>
            <div>stateless</div>
        </>
    }



    describe('using Context.Provider renders', () => {

        beforeEach(() => {
            childRenderFn.mockReset();
        })

        const UsingProviderApp = () => {
            const [count, setCount] = useState(1)

            return <CounterContext.Provider value={{ count, setCount }}>
                <Component1 />
                <Stateless />
            </CounterContext.Provider>
        }

        it('re renders stateless components ', async () => {

            const { getByText } = render(<UsingProviderApp />)


            await waitFor(() => {
                getByText('count: 1')
            })

            expect(childRenderFn).toBeCalledTimes(1)

            fireEvent.click(getByText('parentButton'))

            await waitFor(() => {
                getByText('count: 2')
            })

            expect(childRenderFn).toBeCalledTimes(2)

        })


        it(' re renders components not using contexts ', async () => {

            const { getByText } = render(<UsingProviderApp />)


            await waitFor(() => {
                getByText('count: 1')
            })

            expect(childRenderFn).toBeCalledTimes(1)

            fireEvent.click(getByText('parentButton'))
            fireEvent.click(getByText('parentButton'))

            await waitFor(() => {
                getByText('count: 3')
            })

            expect(childRenderFn).toBeCalledTimes(3)

        })

    })



    describe('using custom Provider stop re-renders', () => {

        beforeEach(() => {
            childRenderFn.mockReset();
        })

        const CounterProvider = ({ children }) => {
            const [count, setCount] = useState(1)

            return <CounterContext.Provider value={{ count, setCount }}>
                {children}
            </CounterContext.Provider>
        }

        const UsingCustomProviderApp = () => {
            return <CounterProvider>
                <Component1 />
                <Stateless />
            </CounterProvider>
        }


        it('stateless components rendered only once', async () => {

            const { getByText } = render(<UsingCustomProviderApp />)

            await waitFor(() => {
                getByText('count: 1')
            })

            expect(childRenderFn).toBeCalledTimes(1)

            fireEvent.click(getByText('parentButton'))

            await waitFor(() => {
                getByText('count: 2')
            })

            expect(childRenderFn).toBeCalledTimes(1)

        })



        it('multiple clicks don\'t trigger re-render in  the child component', async () => {

            const { getByText } = render(<UsingCustomProviderApp />)

            await waitFor(() => {
                getByText('count: 1')
            })

            expect(childRenderFn).toBeCalledTimes(1)

            fireEvent.click(getByText('parentButton'))
            fireEvent.click(getByText('parentButton'))

            await waitFor(() => {
                getByText('count: 3')
            })

            expect(childRenderFn).toBeCalledTimes(1)

        })

    })
})