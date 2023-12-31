var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { abort, pipe } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 46,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response((0, import_node.createReadableStreamFromReadable)(body), {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { abort, pipe } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 88,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response((0, import_node.createReadableStreamFromReadable)(body), {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
var import_node3 = require("@remix-run/node"), import_react2 = require("@remix-run/react");

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client");

// app/singleton.server.ts
var singleton = (name, valueFactory) => {
  let g = global;
  return g.__singletons ??= {}, g.__singletons[name] ??= valueFactory(), g.__singletons[name];
};

// app/db.server.ts
var prisma = singleton("prisma", () => new import_client.PrismaClient());
prisma.$connect();

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function verifyLogin(email, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: !0
    }
  });
  if (!userWithPassword || !userWithPassword.password || !await import_bcryptjs.default.compare(
    password,
    userWithPassword.password.hash
  ))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-K3U3ZTBH.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
], loader = async ({ request }) => (0, import_node3.json)({ user: await getUser(request) });
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// app/routes/notes.$noteId.tsx
var notes_noteId_exports = {};
__export(notes_noteId_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => NoteDetailsPage,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), import_react3 = require("@remix-run/react"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/models/note.server.ts
function getNote({
  id,
  userId
}) {
  return prisma.note.findFirst({
    select: { id: !0, body: !0, title: !0 },
    where: { id, userId }
  });
}
function getNoteListItems({ userId }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: !0, title: !0 },
    orderBy: { updatedAt: "desc" }
  });
}
function createNote({
  body,
  title,
  userId
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}
function deleteNote({
  id,
  userId
}) {
  return prisma.note.deleteMany({
    where: { id, userId }
  });
}

// app/routes/notes.$noteId.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), loader2 = async ({ params, request }) => {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant2.default)(params.noteId, "noteId not found");
  let note = await getNote({ id: params.noteId, userId });
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node4.json)({ note });
}, action = async ({ params, request }) => {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant2.default)(params.noteId, "noteId not found"), await deleteNote({ id: params.noteId, userId }), (0, import_node4.redirect)("/notes");
};
function NoteDetailsPage() {
  let data = (0, import_react3.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-2xl font-bold", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "py-6", children: data.note.body }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("hr", { className: "my-4" }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/notes.$noteId.tsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = (0, import_react3.useRouteError)();
  return error instanceof Error ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 58,
    columnNumber: 12
  }, this) : (0, import_react3.isRouteErrorResponse)(error) ? error.status === 404 ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: "Note not found" }, void 0, !1, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 66,
    columnNumber: 12
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.statusText
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Unknown Error" }, void 0, !1, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 62,
    columnNumber: 12
  }, this);
}

// app/routes/notes._index.tsx
var notes_index_exports = {};
__export(notes_index_exports, {
  default: () => NoteIndexPage
});
var import_react4 = require("@remix-run/react"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { children: [
    "No note selected. Select a note on the left, or",
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react4.Link, { to: "new", className: "text-blue-500 underline", children: "create a new note." }, void 0, !1, {
      fileName: "app/routes/notes._index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes._index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader3
});
var loader3 = async ({ request }) => {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
};

// app/routes/notes.new.tsx
var notes_new_exports = {};
__export(notes_new_exports, {
  action: () => action2,
  default: () => NewNotePage
});
var import_node5 = require("@remix-run/node"), import_react5 = require("@remix-run/react"), import_react6 = require("react");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), action2 = async ({ request }) => {
  let userId = await requireUserId(request), formData = await request.formData(), title = formData.get("title"), body = formData.get("body");
  if (typeof title != "string" || title.length === 0)
    return (0, import_node5.json)(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 }
    );
  if (typeof body != "string" || body.length === 0)
    return (0, import_node5.json)(
      { errors: { body: "Body is required", title: null } },
      { status: 400 }
    );
  let note = await createNote({ body, title, userId });
  return (0, import_node5.redirect)(`/notes/${note.id}`);
};
function NewNotePage() {
  let actionData = (0, import_react5.useActionData)(), titleRef = (0, import_react6.useRef)(null), bodyRef = (0, import_react6.useRef)(null);
  return (0, import_react6.useEffect)(() => {
    actionData?.errors?.title ? titleRef.current?.focus() : actionData?.errors?.body && bodyRef.current?.focus();
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_react5.Form,
    {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Title: " }, void 0, !1, {
              fileName: "app/routes/notes.new.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              "input",
              {
                ref: titleRef,
                name: "title",
                className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose",
                "aria-invalid": actionData?.errors?.title ? !0 : void 0,
                "aria-errormessage": actionData?.errors?.title ? "title-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes.new.tsx",
                lineNumber: 61,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          actionData?.errors?.title ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "pt-1 text-red-700", id: "title-error", children: actionData.errors.title }, void 0, !1, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 72,
            columnNumber: 11
          }, this) : null
        ] }, void 0, !0, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Body: " }, void 0, !1, {
              fileName: "app/routes/notes.new.tsx",
              lineNumber: 80,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              "textarea",
              {
                ref: bodyRef,
                name: "body",
                rows: 8,
                className: "w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6",
                "aria-invalid": actionData?.errors?.body ? !0 : void 0,
                "aria-errormessage": actionData?.errors?.body ? "body-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes.new.tsx",
                lineNumber: 81,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 79,
            columnNumber: 9
          }, this),
          actionData?.errors?.body ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "pt-1 text-red-700", id: "body-error", children: actionData.errors.body }, void 0, !1, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 93,
            columnNumber: 11
          }, this) : null
        ] }, void 0, !0, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 78,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 100,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 99,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/notes.new.tsx",
      lineNumber: 49,
      columnNumber: 5
    },
    this
  );
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader4
});
var import_node6 = require("@remix-run/node");
var action3 = async ({ request }) => logout(request), loader4 = async () => (0, import_node6.redirect)("/");

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var import_react9 = require("react");

// app/components/NavigationBar.tsx
var import_react7 = require("react"), import_react_spring = require("react-spring"), import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), NavigationBar = ({ isExclusiveOpen, toggleExclusiveDropdown, setBannerIsExclusiveOpen }) => {
  let dropdownRef = (0, import_react7.useRef)(null), userMenuRef = (0, import_react7.useRef)(null), [isUserMenuOpen, setIsUserMenuOpen] = (0, import_react7.useState)(!1), dropdownAnimation = (0, import_react_spring.useSpring)({
    opacity: isExclusiveOpen ? 1 : 0,
    maxHeight: isExclusiveOpen ? 400 : 0
  });
  (0, import_react7.useEffect)(() => {
    let handleClickOutside = (event) => {
      isUserMenuOpen && // Check if the user menu is open
      userMenuRef.current && !userMenuRef.current.contains(event.target) && setIsUserMenuOpen(!1);
    };
    return document.addEventListener("click", handleClickOutside), () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen, setIsUserMenuOpen]), (0, import_react7.useEffect)(() => {
    console.log("Navbar isExclusiveOpen:", isExclusiveOpen);
    let handleClickOutside = (event) => {
      isExclusiveOpen && // Check if the menu is open
      dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.classList.contains("balzac") && toggleExclusiveDropdown(!1);
    };
    return document.addEventListener("click", handleClickOutside), () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExclusiveOpen, setBannerIsExclusiveOpen]), console.log("Navbar isExclusiveOpen:", isExclusiveOpen);
  let userMenu = /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      "button",
      {
        type: "button",
        className: "flex rounded-full  text-sm  focus:bg-red-500 focus:text-white  p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 justify-center items-center",
        "aria-expanded": isUserMenuOpen,
        "aria-haspopup": "true",
        onClick: () => setIsUserMenuOpen((prev) => !prev),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Open user menu" }, void 0, !1, {
            fileName: "app/components/NavigationBar.tsx",
            lineNumber: 72,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[lucide--user-round] w-5 h-5" }, void 0, !1, {
            fileName: "app/components/NavigationBar.tsx",
            lineNumber: 73,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 65,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/NavigationBar.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    isUserMenuOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      "div",
      {
        ref: userMenuRef,
        className: "absolute right-0 z-10 mt-4 w-[15rem] origin-top-right rounded-md bg-black/50 backdrop-blur-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
        role: "menu",
        "aria-orientation": "vertical",
        "aria-labelledby": "user-menu-button",
        tabIndex: "-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center",
              role: "menuitem",
              tabIndex: "-1",
              id: "user-menu-item-0",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[lucide--user-round] w-5 h-5" }, void 0, !1, {
                  fileName: "app/components/NavigationBar.tsx",
                  lineNumber: 95,
                  columnNumber: 13
                }, this),
                "Manage my account"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 88,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-100 flex items-center gap-x-4",
              role: "menuitem",
              tabIndex: "-1",
              id: "user-menu-item-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[ic--outline-border-color] w-5 h-5" }, void 0, !1, {
                  fileName: "app/components/NavigationBar.tsx",
                  lineNumber: 105,
                  columnNumber: 13
                }, this),
                "My order"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 98,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center",
              role: "menuitem",
              tabIndex: "-1",
              id: "user-menu-item-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[material-symbols--cancel-outline] w-5 h-5" }, void 0, !1, {
                  fileName: "app/components/NavigationBar.tsx",
                  lineNumber: 115,
                  columnNumber: 13
                }, this),
                "Cancellation"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 108,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center",
              role: "menuitem",
              tabIndex: "-1",
              id: "user-menu-item-3",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[material-symbols--star-outline] w-5 h-5" }, void 0, !1, {
                  fileName: "app/components/NavigationBar.tsx",
                  lineNumber: 125,
                  columnNumber: 13
                }, this),
                "My reviews"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 118,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center",
              role: "menuitem",
              tabIndex: "-1",
              id: "user-menu-item-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "icon-[tabler--logout-2] w-5 h-5" }, void 0, !1, {
                  fileName: "app/components/NavigationBar.tsx",
                  lineNumber: 135,
                  columnNumber: 13
                }, this),
                "Logout"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 128,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 78,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/NavigationBar.tsx",
    lineNumber: 63,
    columnNumber: 1
  }, this);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("nav", { className: "flex justify-around items-center p-4 text-neutral-900  ", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative", ref: dropdownRef, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "span",
        {
          className: "font-bold lg:text-xl cursor-pointer",
          onClick: toggleExclusiveDropdown,
          children: "Exclusive"
        },
        void 0,
        !1,
        {
          fileName: "app/components/NavigationBar.tsx",
          lineNumber: 147,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        import_react_spring.animated.div,
        {
          style: dropdownAnimation,
          className: "absolute top-[2.3rem] -left-[7.3rem] mt-2 w-[18rem] p-2 bg-white text-black border border-r-black text-center pb-6 pt-6  balzac",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 1" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 158,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 2" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 159,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 3" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 160,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 4" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 161,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 5" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 162,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 4" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 163,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "py-3", children: "Dropdown Item 5" }, void 0, !1, {
              fileName: "app/components/NavigationBar.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/NavigationBar.tsx",
          lineNumber: 153,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/NavigationBar.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex space-x-6 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Home" }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Contact" }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 172,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "About" }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Signup" }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/NavigationBar.tsx",
      lineNumber: 170,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center space-x-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "input",
          {
            type: "text",
            placeholder: "What are you looking for",
            value: "",
            className: "pl-4 pr-16 py-2 border text-xs border-gray-300 rounded focus:outline-none focus:border-blue-500 "
          },
          void 0,
          !1,
          {
            fileName: "app/components/NavigationBar.tsx",
            lineNumber: 180,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "absolute right-3 transform icon-[mingcute--search-line] text-gray-500 lg:h-5 lg:w-5 top-1/4" }, void 0, !1, {
          fileName: "app/components/NavigationBar.tsx",
          lineNumber: 186,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 179,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "lg:h-5 lg:w-5 cursor-pointer icon-[mdi--heart-outline] " }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 188,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "lg:h-5 lg:w-5 cursor-pointer icon-[ion--cart-outline] " }, void 0, !1, {
        fileName: "app/components/NavigationBar.tsx",
        lineNumber: 189,
        columnNumber: 9
      }, this),
      userMenu
    ] }, void 0, !0, {
      fileName: "app/components/NavigationBar.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/NavigationBar.tsx",
    lineNumber: 144,
    columnNumber: 5
  }, this);
}, NavigationBar_default = NavigationBar;

// app/components/BannerComponent.tsx
var import_react8 = require("react"), import_react_spring2 = require("react-spring"), import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), BannerComponent = ({ bannerIsExclusiveOpen, setBannerIsExclusiveOpen }) => {
  let [bannerIndex, setBannerIndex] = (0, import_react8.useState)(0);
  (0, import_react8.useEffect)(() => {
    let interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3e3);
    return () => clearInterval(interval);
  }, []), (0, import_react8.useEffect)(() => {
    console.log("Banner isExclusiveOpen:", bannerIsExclusiveOpen);
  }, [bannerIsExclusiveOpen]);
  let bannerWidthAnimation = (0, import_react_spring2.useSpring)({
    width: bannerIsExclusiveOpen ? "60rem" : "100vw",
    config: { tension: 0, friction: 0 }
  }), bannermtAnimation = (0, import_react_spring2.useSpring)({
    marginTop: bannerIsExclusiveOpen ? "2rem" : "0",
    // Adjusted from '8' to '8rem'
    config: { tension: 0, friction: 0 }
  }), bannermlAnimation = (0, import_react_spring2.useSpring)({
    marginLeft: "0",
    // Adjusted from '8' to '8rem'
    config: { tension: 0, friction: 0 }
  }), circlePositionAnimation = (0, import_react_spring2.useSpring)({
    top: bannerIsExclusiveOpen ? "20.5rem" : "19rem",
    // Adjust values as needed
    config: { tension: 0, friction: 0 }
  }), banner1Animation = (0, import_react_spring2.useSpring)({ opacity: bannerIndex === 0 ? 1 : 0, from: { opacity: 0 } }), banner2Animation = (0, import_react_spring2.useSpring)({ opacity: bannerIndex === 1 ? 1 : 0, from: { opacity: 0 } }), banner3Animation = (0, import_react_spring2.useSpring)({ opacity: bannerIndex === 2 ? 1 : 0, from: { opacity: 0 } }), banner4Animation = (0, import_react_spring2.useSpring)({ opacity: bannerIndex === 3 ? 1 : 0, from: { opacity: 0 } }), banner5Animation = (0, import_react_spring2.useSpring)({ opacity: bannerIndex === 4 ? 1 : 0, from: { opacity: 0 } }), banner1 = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...banner1Animation, ...bannermtAnimation, ...bannermlAnimation },
      className: "flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-4 items-center mb-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
                alt: "Epiphany Logo",
                className: "h-10 w-10 rounded-full  mr-2"
              },
              void 0,
              !1,
              {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 58,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-md md:text-md lg:text-md text-white/50 font-bold", children: "Epiphany Health series" }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 63,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg md:text-xl lg:text-3xl mb-8 font-medium", children: [
            "Embrace a thegrher ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 67,
              columnNumber: 30
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "pt-16", children: "lifestyle with Epiphany1. " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 68,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 66,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { className: "text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop Now " }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 72,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "bg-white w-32 h-0.5" }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 73,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 71,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "icon-[lucide--arrow-right] h-5 w-5 ", children: " " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 75,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 70,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 55,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "img",
          {
            src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
            alt: "Banner",
            className: "w-[30rem] h-auto "
          },
          void 0,
          !1,
          {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 78,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  ), banner2 = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...banner2Animation, ...bannermtAnimation, ...bannermlAnimation },
      className: "flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-4 items-center mb-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
                alt: "Epiphany Logo",
                className: "h-10 w-10 rounded-full  mr-2"
              },
              void 0,
              !1,
              {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 94,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-md md:text-md lg:text-md text-white/50 font-bold", children: "Epiphany Health series" }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 99,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 93,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg md:text-xl lg:text-3xl mb-8 font-medium", children: [
            "Embrace a healthier ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 103,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "pt-16", children: "lifestyle with Epiphany2. " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 104,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 102,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { className: "text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop Now " }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 108,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "bg-white w-32 h-0.5" }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 109,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 107,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "icon-[lucide--arrow-right] h-5 w-5 ", children: " " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 111,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 106,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 91,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "img",
          {
            src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
            alt: "Banner",
            className: "w-[30rem] h-auto "
          },
          void 0,
          !1,
          {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 114,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 86,
      columnNumber: 5
    },
    this
  ), banner3 = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...banner3Animation, ...bannermtAnimation, ...bannermlAnimation },
      className: "flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-4 items-center mb-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
                alt: "Epiphany Logo",
                className: "h-10 w-10 rounded-full  mr-2"
              },
              void 0,
              !1,
              {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 130,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-md md:text-md lg:text-md text-white/50 font-bold", children: "Epiphany Health series" }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 135,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 129,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg md:text-xl lg:text-3xl mb-8 font-medium", children: [
            "Embrace a healthier ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 139,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "pt-16", children: "lifestyle with Epiphany3. " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 140,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 138,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { className: "text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop Now " }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 144,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "bg-white w-32 h-0.5" }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 145,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 143,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "icon-[lucide--arrow-right] h-5 w-5 ", children: " " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 147,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 142,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 127,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "img",
          {
            src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
            alt: "Banner",
            className: "w-[30rem] h-auto "
          },
          void 0,
          !1,
          {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 150,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 122,
      columnNumber: 5
    },
    this
  ), banner4 = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...banner4Animation, ...bannermtAnimation, ...bannermlAnimation },
      className: "flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-4 items-center mb-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
                alt: "Epiphany Logo",
                className: "h-10 w-10 rounded-full  mr-2"
              },
              void 0,
              !1,
              {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 166,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-md md:text-md lg:text-md text-white/50 font-bold", children: "Epiphany Health series" }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 171,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 165,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg md:text-xl lg:text-3xl mb-8 font-medium", children: [
            "Embrace a healthier ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 175,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "pt-16", children: "lifestyle with Epiphany4. " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 176,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 174,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { className: "text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop Now " }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 180,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "bg-white w-32 h-0.5" }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 181,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 179,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "icon-[lucide--arrow-right] h-5 w-5 ", children: " " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 183,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 178,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 163,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "img",
          {
            src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
            alt: "Banner",
            className: "w-[30rem] h-auto "
          },
          void 0,
          !1,
          {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 186,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 158,
      columnNumber: 5
    },
    this
  ), banner5 = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...banner5Animation, ...bannermtAnimation, ...bannermlAnimation },
      className: "flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-4 items-center mb-8", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
                alt: "Epiphany Logo",
                className: "h-10 w-10 rounded-full  mr-2"
              },
              void 0,
              !1,
              {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 202,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-md md:text-md lg:text-md text-white/50 font-bold", children: "Epiphany Health series" }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 207,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 201,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg md:text-xl lg:text-3xl mb-8 font-medium", children: [
            "Embrace a healthier ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 211,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "pt-16", children: "lifestyle with Epiphany5. " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 212,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 210,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { className: "text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop Now " }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 216,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "bg-white w-32 h-0.5" }, void 0, !1, {
                fileName: "app/components/BannerComponent.tsx",
                lineNumber: 217,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 215,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "icon-[lucide--arrow-right] h-5 w-5 ", children: " " }, void 0, !1, {
              fileName: "app/components/BannerComponent.tsx",
              lineNumber: 219,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 214,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 199,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "img",
          {
            src: "https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS",
            alt: "Banner",
            className: "w-[30rem] h-auto "
          },
          void 0,
          !1,
          {
            fileName: "app/components/BannerComponent.tsx",
            lineNumber: 222,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 194,
      columnNumber: 5
    },
    this
  ), banners = [banner1, banner2, banner3, banner4, banner5], circle = /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    import_react_spring2.animated.div,
    {
      style: { ...bannerWidthAnimation, ...circlePositionAnimation },
      className: "flex justify-center  absolute w-screen right-0 px-4 gap-x-4",
      children: banners.map((banner, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        "span",
        {
          className: `icon-[bxs--circle] ${index === bannerIndex ? "text-red-500" : "text-white/50"} h-3 w-3`
        },
        index,
        !1,
        {
          fileName: "app/components/BannerComponent.tsx",
          lineNumber: 241,
          columnNumber: 7
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "app/components/BannerComponent.tsx",
      lineNumber: 236,
      columnNumber: 3
    },
    this
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "relative  border  border-t-black", children: [
    banners,
    circle
  ] }, void 0, !0, {
    fileName: "app/components/BannerComponent.tsx",
    lineNumber: 249,
    columnNumber: 10
  }, this);
}, BannerComponent_default = BannerComponent;

// app/routes/_index.tsx
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  let [isExclusiveOpen, setIsExclusiveOpen] = (0, import_react9.useState)(!1), [bannerIsExclusiveOpen, setBannerIsExclusiveOpen] = (0, import_react9.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(NavigationBar_default, { isExclusiveOpen, toggleExclusiveDropdown: () => {
      setIsExclusiveOpen(!isExclusiveOpen), setBannerIsExclusiveOpen((prevBannerState) => !prevBannerState);
    } }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(BannerComponent_default, { bannerIsExclusiveOpen, setBannerIsExclusiveOpen }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => LoginPage,
  loader: () => loader5,
  meta: () => meta2
});
var import_node7 = require("@remix-run/node"), import_react12 = require("@remix-run/react"), import_react13 = require("react");

// app/utils.ts
var import_react10 = require("@remix-run/react"), import_react11 = require("react"), DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function useMatchesData(id) {
  let matchingRoutes = (0, import_react10.useMatches)();
  return (0, import_react11.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  )?.data;
}
function isUser(user) {
  return user != null && typeof user == "object" && "email" in user && typeof user.email == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/routes/login.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader5 = async ({ request }) => await getUserId(request) ? (0, import_node7.redirect)("/") : (0, import_node7.json)({}), action4 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node7.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node7.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node7.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    redirectTo,
    remember: remember === "on",
    request,
    userId: user.id
  }) : (0, import_node7.json)(
    { errors: { email: "Invalid email or password", password: null } },
    { status: 400 }
  );
}, meta2 = () => [{ title: "Login" }];
function LoginPage() {
  let [searchParams] = (0, import_react12.useSearchParams)(), redirectTo = searchParams.get("redirectTo") || "/notes", actionData = (0, import_react12.useActionData)(), emailRef = (0, import_react13.useRef)(null), passwordRef = (0, import_react13.useRef)(null);
  return (0, import_react13.useEffect)(() => {
    actionData?.errors?.email ? emailRef.current?.focus() : actionData?.errors?.password && passwordRef.current?.focus();
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react12.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 87,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": actionData?.errors?.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 94,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.email ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 108,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 86,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "current-password",
            "aria-invalid": actionData?.errors?.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 123,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.password ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 134,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 122,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 141,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Log in"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 142,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "input",
          {
            id: "remember",
            name: "remember",
            type: "checkbox",
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 150,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "label",
          {
            htmlFor: "remember",
            className: "ml-2 block text-sm text-gray-900",
            children: "Remember me"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 156,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          import_react12.Link,
          {
            className: "text-blue-500 underline",
            to: {
              pathname: "/join",
              search: searchParams.toString()
            },
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 165,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 163,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 85,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 84,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader6
});
var import_node8 = require("@remix-run/node"), import_react14 = require("@remix-run/react");
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), loader6 = async ({ request }) => {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems({ userId });
  return (0, import_node8.json)({ noteListItems });
};
function NotesPage() {
  let data = (0, import_react14.useLoaderData)(), user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Link, { to: ".", children: "Notes" }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { children: user.email }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/notes.tsx",
          lineNumber: 27,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Link, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("hr", {}, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "p-4", children: "No notes yet" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          import_react14.NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/notes.tsx",
            lineNumber: 50,
            columnNumber: 19
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 49,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex-1 p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Outlet, {}, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action5,
  default: () => Join,
  loader: () => loader7,
  meta: () => meta3
});
var import_node9 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), import_react16 = require("react");
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), loader7 = async ({ request }) => await getUserId(request) ? (0, import_node9.redirect)("/") : (0, import_node9.json)({}), action5 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(email))
    return (0, import_node9.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node9.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node9.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  if (await getUserByEmail(email))
    return (0, import_node9.json)(
      {
        errors: {
          email: "A user already exists with this email",
          password: null
        }
      },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    redirectTo,
    remember: !1,
    request,
    userId: user.id
  });
}, meta3 = () => [{ title: "Sign Up" }];
function Join() {
  let [searchParams] = (0, import_react15.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react15.useActionData)(), emailRef = (0, import_react16.useRef)(null), passwordRef = (0, import_react16.useRef)(null);
  return (0, import_react16.useEffect)(() => {
    actionData?.errors?.email ? emailRef.current?.focus() : actionData?.errors?.password && passwordRef.current?.focus();
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_react15.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 92,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": actionData?.errors?.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 99,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.email ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 113,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 98,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 91,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 121,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": actionData?.errors?.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 128,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.password ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 120,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 146,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 147,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        import_react15.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 156,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 154,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 90,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 89,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-RYQK47IU.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-CB6G6OJG.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-MWLQNHSH.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-3ELSCEIM.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-V7JC2ABF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-UKIBAX2W.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-YBW5O53P.js", imports: ["/build/_shared/chunk-G3ACJGOK.js", "/build/_shared/chunk-QUFIRVDY.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-BUIFBK64.js", imports: ["/build/_shared/chunk-G3ACJGOK.js", "/build/_shared/chunk-QUFIRVDY.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GGSXPJWV.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/build/routes/notes-HNQSVXB2.js", imports: ["/build/_shared/chunk-QUFIRVDY.js", "/build/_shared/chunk-2LJDV4EM.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/notes.$noteId": { id: "routes/notes.$noteId", parentId: "routes/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/notes.$noteId-ZUTFOZD6.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/notes._index": { id: "routes/notes._index", parentId: "routes/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/notes._index-VQRXW3TK.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/notes.new": { id: "routes/notes.new", parentId: "routes/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/notes.new-KE7YMLK6.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "118b9e7c", hmr: { runtime: "/build/_shared\\chunk-MWLQNHSH.js", timestamp: 1703771749566 }, url: "/build/manifest-118B9E7C.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/notes.$noteId": {
    id: "routes/notes.$noteId",
    parentId: "routes/notes",
    path: ":noteId",
    index: void 0,
    caseSensitive: void 0,
    module: notes_noteId_exports
  },
  "routes/notes._index": {
    id: "routes/notes._index",
    parentId: "routes/notes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: notes_index_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/notes.new": {
    id: "routes/notes.new",
    parentId: "routes/notes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: notes_new_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
