import path from 'path'
import { Project, StructureKind } from "ts-morph";
import { SyntaxKind } from 'typescript';

async function main() {
  // initialize
  const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
  });

  // add source files

  project.addSourceFilesAtPaths('/Users/bas/REPOS/demo-benny/example/**/*.ts');

  project.getSourceFiles().forEach(sourceFile => {
    sourceFile.getImportDeclarations().forEach(importDeclaration => {
      importDeclaration.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach(stringLiteral => {
        console.log(stringLiteral.getText());
        stringLiteral.replaceWithText(`'${stringLiteral.getText().replaceAll("'", '')}.js'`);
      });
    });
    sourceFile.saveSync();
  });
}

main();