import { StrictMode, useEffect, useRef, useState } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { proxy, snapshot, useSnapshot } from 'valtio'
import React from 'react'


it('simple counter', async () => {
    const obj = proxy({ count: 0 })

    const Counter = () => {
        const snap = useSnapshot(obj)
        return (
            <>
                <div>count: {snap.count}</div>
                <button onClick={() => ++obj.count}>button</button>
            </>
        )
    }

    const { getByText, findByText, unmount } = render(
        <StrictMode>
            <Counter />
        </StrictMode>,
    )

    await findByText('count: 0')

    fireEvent.click(getByText('button'))
    await findByText('count: 1')
    unmount()
})
