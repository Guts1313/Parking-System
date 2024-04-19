import { FileIcon, FolderIcon, JSXIcon, TSIcon } from "./Icons";

export function Docs() {
  return (
    <div className="max-w-full rounded-tl-3xl bg-[#1f2937] py-8 text-white">
      <section className="mb-16 px-3 py-8 md:px-8">
        <h2 className="mb-3 text-2xl font-medium">File Structure</h2>
        <div className="pl-2">
          <div className="mb-3 flex pl-5">
            <FolderIcon className="h-6 w-6" />
            <span className="pl-2">components</span>
          </div>
          <div className="mb-3 flex pl-11">
            <FolderIcon />
            <span className="pl-2">docs</span>
          </div>
          <div className="mb-3 flex pl-16">
            <FolderIcon />
            <span className="pl-2">docs</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">AddEntryModal.tsx</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">Content.tsx</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">EntryModal.tsx</span>
          </div>
          <div className="mb-3 flex pl-5">
            <FolderIcon className="h-6 w-6" />
            <span className="pl-2">dashboard</span>
          </div>
          <div className="mb-3 flex pl-11">
            <FolderIcon />
            <span className="pl-2">sidebar</span>
          </div>
          <div className="mb-3 flex pl-16">
            <FolderIcon />
            <span className="pl-2">icons</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">data.tsx</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">Sidebar.tsx</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">SidebarHeader.tsx</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">SidebarItems.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <JSXIcon />
            <span className="pl-2">Layout.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <JSXIcon />
            <span className="pl-2">Overlay.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <JSXIcon />
            <span className="pl-2">Provider.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <JSXIcon />
            <span className="pl-2">TopBar.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <FileIcon className="h-6 w-6" />
            <span className="pl-2">style.module.css</span>
          </div>
        </div>
        <div className="mb-3 flex pl-5">
            <FolderIcon className="h-6 w-6" />
            <span className="pl-2">pages</span>
          </div>
          <div className="mb-3 flex pl-11">
            <FolderIcon />
            <span className="pl-2">admin</span>
          </div>
          <div className="mb-3 flex pl-16">
            <JSXIcon />
            <span className="pl-2">index.tsx</span>
          </div>
          <div className="mb-3 flex pl-5">
            <FolderIcon className="h-6 w-6" />
            <span className="pl-2">types</span>
          </div>
          <div className="mb-3 flex pl-11">
            <JSXIcon />
            <span className="pl-2">heroicons.tsx</span>
          </div>
          <div className="mb-3 flex pl-11">
            <TSIcon />
            <span className="pl-2">types.ts</span>
          </div>
          <div className="mb-3 flex pl-6">
            <TSIcon className="h-6 w-6" />
            <span className="pl-2">App.tsx</span>
          </div>
          <div className="mb-3 flex pl-6">
            <FileIcon className="h-6 w-6" />
            <span className="pl-2">global.css</span>
          </div>
          <div className="mb-3 flex pl-6">
            <JSXIcon className="h-6 w-6" />
            <span className="pl-2">main.tsx</span>
          </div>
          <div className="mb-3 flex pl-6">
            <TSIcon className="h-6 w-6" />
            <span className="pl-2">vite-env.ts</span>
          </div>
      </section>

      <section className="mb-16 px-3 md:px-8">
        <h2 className="text-2xl font-medium">File Structure (not everything)</h2>

        <div className="mb-8 mt-4">
          <div className="flex">
            <FolderIcon /> <strong className="px-1">sidebar</strong>
          </div>
          <div className="mt-4 flex flex-wrap pl-6 md:flex-nowrap">
            <FolderIcon className="h-7 w-7" />
            <span className="px-2 font-medium">icons</span> :
            <p className="pl-1">
              Icons used for each sidebar-item.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap pl-6 md:flex-nowrap">
            <JSXIcon /> <span className="px-2 font-medium">data.tsx</span> :
            <p className="pl-1">
              In this file that you will add routes for each sidebar-item.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap pl-6 md:flex-nowrap">
            <JSXIcon /> <span className="px-2 font-medium">Sidebar.tsx</span> :
            <p className="pl-1">Responsable for the sidebar.</p>
            <p className="pl-1">
              Works with <strong>SidebarHeader</strong> and{" "}
              <strong>SidebarItems</strong> components.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap pl-6 md:flex-nowrap">
            <JSXIcon />{" "}
            <span className="px-2 font-medium">SidebarHeader.tsx</span> :
            <p className="pl-1">
              Contains the logo displayed on top of the sidebar.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap pl-6 md:flex-nowrap">
            <JSXIcon />{" "}
            <span className="px-2 font-medium">SidebarItems.tsx</span> :
            <p className="pl-1">
              Automatically generates each sidebar-item according to your routes
              defined in
              <strong className="px-1">data.tsx</strong>
            </p>
          </div>
        </div>

        <div>
          <div className="mt-8 flex flex-wrap md:flex-nowrap">
            <JSXIcon /> <span className="px-1 font-medium">Layout.tsx :</span>{" "}
            Contains the
            <strong className="px-1">DashboardLayout</strong>
            component used as the layout of the application.
          </div>
        </div>

        <div>
          <div className="mt-8 flex flex-wrap md:flex-nowrap">
            <JSXIcon /> <span className="px-1 font-medium">Overlay.tsx :</span>{" "}
            Displays an overlay that will only be visible on small screens to
            emphasize the focus on sidebar when it's open. It's also used to
            close sidebar on an outside click.
          </div>
        </div>

        <div>
          <div className="mt-8 flex flex-wrap md:flex-nowrap">
            <JSXIcon /> <span className="px-1 font-medium">Provider.tsx :</span>{" "}
            Contains the <strong className="px-1">DashboardProvider</strong>{" "}
            component where all the dashboard logic is placed. This will then be
            reused in other components. It handles opening and closing of the
            sidebar.
          </div>
        </div>

        <div>
          <div className="mt-8 flex flex-wrap md:flex-nowrap">
            <JSXIcon /> <span className="px-1 font-medium">TopBar.tsx :</span>
            Customize it or replace it, up to you guys or the client, but don't
            forget to add a button to toggle sidebar on mobile.
          </div>
        </div>

        <div className="mt-8 flex flex-wrap md:flex-nowrap">
          <FileIcon className="h-5 w-5  md:h-7" />
          <span className="px-1 font-medium">style.module.css</span> :
          <p className="pl-1">
            This style sheet is used to make the scrollbar invisible for the
            sidebar and to apply some filters.
          </p>
        </div>
      </section>

      <section className="mb-16 px-3 py-8 md:px-8">
        <h2 className="text-2xl font-medium">Customization</h2>
        <p className="mt-5">
          The sidebar scrollbar is hidden by default but you can still scroll
          with the keyboards if you have several sidebar-items.
          <strong className="px-1">style.module.css</strong>file.
        </p>
        <p className="mt-5">
          In the <strong> dashboard/Layout.tsx</strong> file,
          <strong className="pl-1">Sidebar</strong> component has as prop
          <strong className="pl-1">mobileOrientation</strong>, which indicates
          the orientation of the sidebar on small devices (viewport {"<"}{" "}
          1024px).
        </p>
        <p className="pt-5">That prop can have two possible values :</p>
        <ul className="mt-4 list-disc pl-6">
          <li className="mb-3">
            <strong>start :</strong> sidebar will be aligned to the left
          </li>
          <li>
            <strong>end :</strong> sidebar will be aligned to the right
          </li>
        </ul>
      </section>
    </div>
  );
}
