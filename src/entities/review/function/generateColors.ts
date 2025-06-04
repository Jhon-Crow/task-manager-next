interface UserColors {
    background: string;
    color: string;
}

export function generateColors(
    firstname: string, role: 'ADMIN' | 'MANAGER' | 'WORKER', lastname?: string
): UserColors {
    if (role === 'ADMIN') {
        return {
            background: 'hsl(45, 100%, 50%)',
            color: 'hsl(0, 0%, 0%)'
        };
    }

    let hash = 0;
    const input = firstname + lastname;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0;
    }

    const normalizedHash = (hash >>> 0) / 4294967296;

    if (role === 'MANAGER') {
        const h = Math.floor(normalizedHash * 30);
        const s = 70 + Math.floor(normalizedHash * 30);
        const l = 40 + Math.floor(normalizedHash * 20);
        const textL = l > 50 ? 20 : 80;

        return {
            background: `hsl(${h}, ${s}%, ${l}%)`,
            color: `hsl(0, 0%, ${textL}%)`
        };
    }

    const h = 200 + Math.floor(normalizedHash * 60);
    const s = 70 + Math.floor(normalizedHash * 30);
    const l = 40 + Math.floor(normalizedHash * 20);
    const textL = l > 50 ? 80 : 100;

    return {
        background: `hsl(${h}, ${s}%, ${l}%)`,
        color: `hsl(0, 0%, ${textL}%)`
    };
}