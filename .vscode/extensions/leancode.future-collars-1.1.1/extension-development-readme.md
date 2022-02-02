# Extension development

## Publishing to VS Code marketplace

You can follow [this guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) to learn in
depth how to do this. Below is a short paraphrased guide.

To publish the extension all you have to do is run `vsce publish` (check available options) _but_ you've got to be
authorized first. The command line tool is available on `npm` (`npm i -g vsce`) and also this package has it in its
dependencies, so you can run `npx vsce`.

Here's how it works, in a list of "steps":

1. The extension resides in the VS Code marketplace
   <https://marketplace.visualstudio.com/items?itemName=LeanCode.future-collars>
2. To be able to publish there you need to be authorized
3. Azure DevOps handles auth, here's our <https://dev.azure.com/LeanCodePL/>
4. All you need is a Personal Access Token. Enter <https://dev.azure.com/LeanCodePL/_usersSettings/tokens>
5. Click `New Token`
6. Fields:
    1. Name: anything you want
    2. Organization: "All accessible organizations" (anything else won't work)
    3. Expiration: anything you want
    4. Scopes: Custom defined -> show all scopes -> Marketplace -> select "Acquire" and "Manage" (will automatically
       select "Read" and "Publish"). You can leave any other scopes default
7. Create
8. Copy the token
9. Make sure that you have valid permissions for publisher in
   <https://marketplace.visualstudio.com/manage/publishers/LeanCode>
10. Go back to your command line in `<Future Collars repo>/code-editor`
11. Run `vsce login LeanCode`
    1. Paste the token (PAT) when prompted
    2. Mind it expires depending on the date you set, so don't be surprised in a month or so that you're unauthorized
       again
12. You should be able to now run `vsce publish`. It's going to run the `vscode:prepublish` script from package.json
    (compile the extension) and then publish it to the marketplace.

> Note: you can package the extension locally to a `.vsix` file without the need for marketplace. This is useful for
> local testing of the complete extension package. You can install the package going from vscode's extensions view ->
> overflow (`...`) menu -> "Install from VSIX..." or running `code --install-extension <path-to-vsix>`

## Issues

-   You might have some cache issues when installing/uninstalling your extension, so to be sure it's gone from your
    computer you can visit your extension directory and delete it. On linux it's `~/.vscode/extensions`
