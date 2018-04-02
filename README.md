# Testing Ng

An Angular app when generated with [Angular CLI](https://cli.angular.io/), comes bundled with Karma as the Test Runner for JavaScript and Jasmine as the Test Framework.

### What is expected out of a testing framework?

A testing framework should provide an ability to define assertions and also provide capability to mock with mocking library. For instance Mocha testing framework can be used with Chai as assertion library and Sinon as mocking library.

But making use of Jasmine Testing Framework would eliminate the need for having a separate assertion and mocking library. It's all bundled within Jasmine.

### What is Karma?

Karma is a test runner; it does nothing but runs tests. Karma is the default test runner bundled with an app scaffolded with Angular CLI.

### What is Jest?

[Jest](https://facebook.github.io/jest/) is a zero-configuration testing platform. It's used to test all JavaScript code at Facebook and taking into account the scale of JavaScript at Facebook Jest proves as a reliable test platform.

### Why Jest

- Faster than Karma
  
  Jest is faster than Karma in execution. Jest does not use a browser or headless browser to test JavaScript. Rather it makes use of [jsdom](https://github.com/jsdom/jsdom).
  
  Jest runs tests in parallel across workers to maximize performance. As advertised on it's [home page](https://facebook.github.io/jest/). But trust me that's very much true.
  
  When encouraging engineers to adopt TDD, the least thing to do is to provide a test runner which is slow.
  
- Snapshot Testing
  
  Jest introduces this concept of [Snapshot Testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) where an engineer will be able to capture snapshots of any serializable values to simplify testing. Snapshots can be captured for every change in state of the application so that whenever a new state of applicaiton is defined the tests break bringing the need to write/update tests.
  
- Watch mode

  Jest can run in watch mode which means that you can test your components as you write them. One could write tests for a component/module, let it fail and start building the component/module to see all the tests created for it pass as the component gets built.

### Configuring Jest for an Angular app

###### Add Test dependencies

To begin, let's add the test dependencies required for Jest.

- `@types/jest` - TypeScript type definitions for Jest.
- `jest` - Jest Testing Platform
- [`jest-preset-angular`](https://github.com/thymikee/jest-preset-angular) - A preset Jest configuration for Angular apps

Run the below command in your project root to add all three above dependencies to your app:

```
npm i --save-dev @types/jest jest jest-preset-angular
```

###### Configure Jest

Configure Jest by adding a `jest` object in `package.json` like below :

```
...
"jest": {
  "preset": "jest-preset-angular",
  "roots": ["<rootDir>/src/"],
  "setupTestFrameworkScriptFile": "<rootDir>/src/setup-jest.ts"
}
```

With the above configuration we are telling **Jest** to make use of `jest-preset-angular` as the preset for Jest configuration and specifying where to lookup for test files by providing it a `root`.

The property `setupTestFrameworkScriptFile` in Jest configuration indicates the file to run after Jest starts running.

Replace current `test` script in `package.json` as `jest` so that our tests can make use of **Jest**.

###### Jest Setup File

Now that we have configured Jest in package.json, let's go ahead and create the Jest Setup file - **setup-jest.ts**.

Create the file **setup-jest.ts** under `src` and add the below content to it:

```
import 'jest-preset-angular';
```

###### All set

Now we are all set with configuring Jest for our Angular app. Now let's go ahead and try creating a test which would test a sample Angular Web Component.

Let's add a component which prints `Hello` followed by the name passed as an attribute. For instance, to render `Hello, John!` the component should be rendered as 

```
<app-hello name="John"></app-hello>
```

To generate the component let's make use of **Angular CLI**.

```
ng g component hello
```

You should now see a folder `hello` under `src/app` with the component files.

You'll set an autogenerated test stub for the `HelloComponent` as `hello.component.spec.ts`.

Let's edit the Hello Component Test Spec to use **Jest** instead of **Jasmine**.

Paste the below content in `hello.component.spec.ts`:

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should exist', () => {
    expect(component).toBeDefined();
  });
});
```

If you've written tests in **Jasmine** the above code will look very familiar as **Jest** makes use of a syntax similar to that of Jasmine.

The only difference being, in Jasmine the `it` function defines an actual test whereas the analogous function in Jest is `test`. After defining the test, we finally write an expectation to see if the component (HelloComponent) is defined.

Let's run `npm test` now. `jest-preset-angular` which is the preset configuration we have used for **Jest**, looks up for all files ending with `spec.ts` and runs them as test files.

`npm test` should give an output like below:

![Test Output](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

Congratulations! We have successfully created a Jest Test Spec for an Angular Web Component. 

Let's go ahead and add one more test to the same test spec which will test that the component renders the `name` passed as data to it. We would basically want to test that the component renders `Hello, John!` when called as `<app-hello name='John'></app-hello>` and renders `Hello, FooBar!` when called as `<app-hello name='FooBar'></app-hello>`.

In order to test what gets rendered in the **dom**, let's add a variable `dom` with `any` as type to our test spec. Assign the `nativeElement` being rendered to `dom` in the `beforeEach` section of the spec. The spec now would look as below:

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloComponent } from './hello.component';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;
  let dom: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    dom = fixture.nativeElement;
    fixture.detectChanges();
  });

  test('should exist', () => {
    expect(component).toBeDefined();
  });
});
``` 

Now let's add the test which will assign the name `John` to the name property of the `HelloComponent`. In order to do that add the below test:

```typescript
test('should render with the data passed in `name`', () => {
    component.name = 'John';
  });
```

We now add an expectation to the test where we want to make sure that the component gets rendered as we expect it to be. The test now would look like:

```typescript
test('should render with the data passed in `name`', () => {
    component.name = 'John';
    expect(dom.innerHTML).toContain('<p>Hello, John!</p>');
  });
```

Let's run the test now. Here's how the test output should look:

![Test Output](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

The test fails as it expects the DOM's inner HTML to contain the name. But in reality the `fixture` is not refreshed after we set the `name` in `component`. Let's refresh the fixture after updating the name in component in our test.

```typescript
test('should render with the data passed in `name`', () => {
    component.name = 'John';
    fixture.detectChanges();
    expect(dom.innerHTML).toContain('<p>Hello, John!</p>');
  });
```

Let's try to run the test now. Here's how the test output should look:

 ![Test Output](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

###### Sample App

If you'd like to see all the config for Jest in an Angular app, clone this repo and start exploring.

```
git clone 
```

In my next blog on _**Testing Ng**_, let's learn how to test an Angular Service and how to run **Jest** with Coverage and in Watch mode.

### Good Read

- https://www.springload.co.nz/blog/why-were-migrating-unit-tests-jest-and-why-you-should-too/

