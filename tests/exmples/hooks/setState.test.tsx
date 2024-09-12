import { StrictMode, useEffect, useRef, useState, useContext, createContext } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi, test } from 'vitest'
import { proxy, snapshot, useSnapshot } from 'valtio'
import React from 'react'


describe('setState', () => {


    describe('re renders all child components when one child changes state in parent', () => {
        const renderFn = vi.fn()

        const Incrementer = (props) => {
            const { setState } = props;
            renderFn('Incrementer', props)
            return <>
                <button onClick={() => setState(n => n + 1)}>increment</button>
            </>
        }

        const Decrementer = (props) => {
            renderFn('Decrementer', props)
            const { setState } = props;
            return <>
                <button onClick={() => setState(n => n + 1)}>decrement</button>
            </>
        }

        const Display = (props) => {
            const { count } = props;
            renderFn('Display', props)
            return <>
                <div>count: {count}</div>
            </>
        }

        const Stateless = (props) => {
            renderFn('Stateless', props)
            return <>
                <div>stateless</div>
            </>
        }

        const NestedStateless = (props) => {
            renderFn('NestedStateless', props)
            return <>
                <div>nested stateless</div>
            </>
        }

        const Stateless2 = (props) => {
            renderFn('Stateless', props)
            return <>
                <div>stateless</div>
                <NestedStateless/>
            </>
        }


        beforeEach(() => {
            renderFn.mockReset();
        })

        test(`renders all child components`, async () => {


            const App = () => {
                const [state, setState] = useState(1);

                return <div>
                    <Display count={state} />
                    <Incrementer setState={setState}></Incrementer>
                    <Decrementer setState={setState}></Decrementer>
                    <Stateless />
                </div>
            }


            const { getByText } = render(<App />)

            await waitFor(() => {
                getByText('count: 1')
            })

            expect(renderFn).toBeCalledTimes(4)

            fireEvent.click(getByText('increment'))

            await waitFor(() => {
                getByText('count: 2')
            })

            expect(renderFn).toBeCalledTimes(8)

            let calls = renderFn.mock.calls;

            expect(calls.filter(x => x[0] === 'Incrementer')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Decrementer')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Display')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Stateless')).toHaveLength(2);


            // setState is not changed
            let incrementRenders = calls.filter(x => x[0] === 'Incrementer')
            expect(incrementRenders).toHaveLength(2);

            const [[, firstRenderProps], [, secondRenderProps]] = incrementRenders
            console.log(`renderFn results`, calls)
            console.log(`Incrementer renders `, firstRenderProps, secondRenderProps)

            expect(firstRenderProps.setState).toBe(secondRenderProps.setState)



        })



        test(`renders all nested child components`, async () => {


            const App = () => {
                const [state, setState] = useState(1);

                return <div>
                    <Display count={state} />
                    <Incrementer setState={setState}></Incrementer>
                    <Decrementer setState={setState}></Decrementer>
                    <Stateless2/>
                </div>
            }


            const { getByText } = render(<App />)

            await waitFor(() => {
                getByText('count: 1')
            })

            expect(renderFn).toBeCalledTimes(5)

            fireEvent.click(getByText('increment'))

            await waitFor(() => {
                getByText('count: 2')
            })

            expect(renderFn).toBeCalledTimes(10)

            let calls = renderFn.mock.calls;

            expect(calls.filter(x => x[0] === 'Incrementer')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Decrementer')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Display')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'Stateless')).toHaveLength(2);
            expect(calls.filter(x => x[0] === 'NestedStateless')).toHaveLength(2);

            // setState is not changed
            let incrementRenders = calls.filter(x => x[0] === 'Incrementer')
            expect(incrementRenders).toHaveLength(2);

            const [[, firstRenderProps], [, secondRenderProps]] = incrementRenders
            console.log(`renderFn results`, calls)
            console.log(`Incrementer renders `, firstRenderProps, secondRenderProps)

            expect(firstRenderProps.setState).toBe(secondRenderProps.setState)



        })


    })

})