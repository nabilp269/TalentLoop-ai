import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-2xl border-gray-200 px-4 py-3 text-sm shadow-sm transition-all duration-300 focus:border-[#16A085] focus:ring-4 focus:ring-[#16A085]/20 ' +
                className
            }
            ref={localRef}
        />
    );
});
