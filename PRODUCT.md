# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served equally:

- **Developers**: they publish their portfolio (repositories that group projects), keep their profile up to date and apply to job postings.
- **Companies**: they post job openings, review the profiles and repositories of the developers who apply, and accept or reject applications.

## Product Purpose

WebWorks connects developers with companies that are hiring. The developer shows real work (repositories and projects) instead of just a CV; the company evaluates that work before deciding on an application. Success means a developer gets their portfolio published and applies, and a company posts an opening and gets applications it can evaluate.

## Positioning

The application is backed by the portfolio: a company sees the developer's repositories and projects from the same flow in which it reviews the application.

## Operating Context

- Academic project (UPC). There are no real users, clients, metrics or testimonials.
- Interface in Spanish; prices in soles (S/.).
- Separate flows per role: developer (`DEVELOPER`) and company (`COMPANY`), each with its own navigation after login.

## Capabilities and Constraints

- Developer: register, profile, repositories and projects (create, edit, delete), payment methods, subscriptions to plans, job applications, comments on profiles, system scoring.
- Company: register, company profile, job postings (create, edit, delete), review of applications by status, view of a developer's profile and repositories.
- Plans: the free plan is limited to 3 repositories and 2 projects (constants in `subscription.service.ts`). The plans table has no data yet.
- Public routes: `/pageInicio`, `/login`, `/registrar`, `/listPlanInicio`.

## Evidence on Hand

- No testimonials, logos of real companies, user counts, press or case studies exist. None may be invented.
- Current landing images (`src/assets/imagenes/primerImagenPageUser.jpg`, `JavaScript.jpg`, `CSS.jpg`, `frontend.jpg`, `precio.jpg`) are stock images, some with visible watermarks; they are not brand assets.
- The only real data that can be shown is product functionality and the limits of the free plan.

## Product Principles

1. Real work over promises: every claim describes something the platform actually does.
2. Two doors, same weight: developer and company find their path without one being subordinate to the other.
3. Honesty of an academic project: no invented metrics, clients or social proof.
