export const RemoveKeyAttribute = (code: string) => {
    return code.replace(/^.*key.*$\n/gm, "")
}
