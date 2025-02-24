using System.Text.RegularExpressions;
using InsuranceClaim.Server.Data;
using InsuranceClaim.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InsuranceClaim.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceClaimController : ControllerBase
    {
        private readonly InsuranceClaimDBContext _insuranceClaimDBContext;

        public InsuranceClaimController(InsuranceClaimDBContext insuranceClaimDBContext)
        {
            _insuranceClaimDBContext = insuranceClaimDBContext;
        }



        [HttpGet("Reserves")]
        public async Task<IActionResult> GetAllReserves()
        {
            var reserves = await _insuranceClaimDBContext.ReserveModel.OrderBy(r=>r.StatusDate).ToListAsync();
            return Ok(reserves);
        }

        [HttpGet("Reserves/Approvals")]
        public async Task<IActionResult> GetAllReservesForApproval()
        {
            var filteredReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Ready to Approve").OrderBy(r => r.StatusDate).ToListAsync();
            return Ok(filteredReserves);
        }

        [HttpGet("Reserves/Approved")]
        public async Task<IActionResult> GetApprovedReserves()
        {
            var filteredReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").OrderBy(r => r.StatusDate).ToListAsync();
            return Ok(filteredReserves);
        }

        [HttpGet("Reserve/{id:Guid}")]
        public async Task<IActionResult> GetReserve([FromRoute] Guid id)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FirstOrDefaultAsync(r => r.Id == id);
            if (reserve == null)
            {
                return NotFound();
            }
            return Ok(reserve);
        }

        [HttpPost("Reserve/add")]
        public async Task<IActionResult> AddReserve([FromBody] ReserveModel reserveModelrequest)
        {

            var previousNewReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "New").ToListAsync();
            var countPreviousNewReserves = previousNewReserves.Count;

            if (countPreviousNewReserves > 0)
            {
                previousNewReserves.ForEach(pnr =>
                {
                    pnr.Status = "OverRidden";
                    pnr.IsOverRidden = true;
                });
                await _insuranceClaimDBContext.SaveChangesAsync();

            }

            reserveModelrequest.Id=Guid.NewGuid();
            await _insuranceClaimDBContext.ReserveModel.AddAsync(reserveModelrequest);
            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserveModelrequest);
        }

        [HttpPut("Reserve/edit/{id:Guid}")]
        public async Task<IActionResult> updateReserve([FromRoute] Guid id, ReserveModel updateReserveModelRequest)
        {
            var reserve = await _insuranceClaimDBContext.ReserveModel.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }

            reserve.ReserveDamage = updateReserveModelRequest.ReserveDamage;
            reserve.ReserveClaimantCost = updateReserveModelRequest.ReserveClaimantCost;
            reserve.ReserveDefenceCost = updateReserveModelRequest.ReserveDefenceCost;
            reserve.Status = updateReserveModelRequest.Status;
            reserve.StatusDate = updateReserveModelRequest.StatusDate;
            if(reserve.Status== "Ready to Approve")
            {
                reserve.IsInApproval = true;
            }

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(reserve);
        }

        [HttpGet("Payments")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments =  await _insuranceClaimDBContext.PaymentModel.OrderBy(p => p.StatusDate).ToListAsync();
            return Ok(payments);
        }

        [HttpGet("Payments/Approvals")]
        public async Task<IActionResult> GetAllPaymentsForApproval()
        {
            var filteredPayments = await _insuranceClaimDBContext.PaymentModel.Where(p => p.Status == "Ready to Approve").OrderBy(p => p.StatusDate).ToListAsync();
            return Ok(filteredPayments);
        }

        [HttpGet("Payments/Approved")]
        public async Task<IActionResult> GetApprovedPayments()
        {
            var filteredPayments = await _insuranceClaimDBContext.PaymentModel.Where(p => p.Status == "Approved").OrderBy(p=>p.StatusDate).ToListAsync();
            return Ok(filteredPayments);
        }

        [HttpGet("Payment/{id:Guid}")]
        public async Task<IActionResult> GetPayment([FromRoute] Guid id)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FirstOrDefaultAsync(r => r.Id == id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpPost("Payment/add")]
        public async Task<IActionResult> AddPayment([FromBody] PaymentModel paymentModelrequest)
        {
            var approvedReserveCount = _insuranceClaimDBContext.ReserveModel.Where(x=> x.Status=="Approved").Count();
            if (approvedReserveCount > 0) {
                paymentModelrequest.Id = Guid.NewGuid();
                await _insuranceClaimDBContext.PaymentModel.AddAsync(paymentModelrequest);
                await _insuranceClaimDBContext.SaveChangesAsync();
                return Ok(paymentModelrequest);
            }

            return BadRequest("No reserves found to associate the payment."); 
        }

        [HttpPut("Payment/edit/{id:Guid}")]
        public async Task<IActionResult> updatePayment([FromRoute] Guid id, PaymentModel updatePaymentModelRequest)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            payment.PaymentDamage = updatePaymentModelRequest.PaymentDamage;
            payment.PaymentClaimantCost = updatePaymentModelRequest.PaymentClaimantCost;
            payment.PaymentDefenceCost = updatePaymentModelRequest.PaymentDefenceCost;
            payment.PaymentType= updatePaymentModelRequest.PaymentType;
            payment.Status = updatePaymentModelRequest.Status;
            payment.StatusDate = DateTime.UtcNow;
            
            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(payment);
        }

        [HttpPut("Payment/readyToApprove/{id:Guid}")]
        public async Task<IActionResult> updatePaymentReadyToApprove([FromRoute] Guid id, PaymentModel updatePaymentModelRequest)
        {
            var payment = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            payment.PaymentDamage = updatePaymentModelRequest.PaymentDamage;
            payment.PaymentClaimantCost = updatePaymentModelRequest.PaymentClaimantCost;
            payment.PaymentDefenceCost = updatePaymentModelRequest.PaymentDefenceCost;
            payment.PaymentType = updatePaymentModelRequest.PaymentType;

            var countApprovedReserve = _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").Count();

            if (updatePaymentModelRequest.IsInApproval && countApprovedReserve > 0)
            {
                payment.Status = "Ready to Approve";
                payment.IsInApproval = true;
                payment.StatusDate = updatePaymentModelRequest.StatusDate;
            }
           
            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(payment);
        }

        [HttpGet("CalculatedReservesWithPayments")]
        public async Task<IActionResult> getCalculatedReserves()
        {
            var approvedReserves = await _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").ToListAsync();
            var approvedPayments = await _insuranceClaimDBContext.PaymentModel.Where(p => p.Status == "Approved").ToListAsync();
            //var latestReserve = approvedReserves.OrderByDescending(p => p.StatusDate).FirstOrDefault();
            approvedReserves.ForEach(ar =>
            {

                var nextReserve = approvedReserves.Where(x => x.StatusDate > ar.StatusDate).OrderBy(r => r.StatusDate).FirstOrDefault();
                var eligiblePaymentsForReserve = approvedPayments.Where(ap => ap.StatusDate >= ar.StatusDate && (ap.StatusDate < nextReserve?.StatusDate || nextReserve == null));

                var paidDamage = eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Recovery").Sum(x => x.PaymentDamage) - eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Paid").Sum(x => x.PaymentDamage);
                var paidClaimantCost = eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Recovery").Sum(x => x.PaymentClaimantCost) - eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Paid").Sum(x => x.PaymentClaimantCost);
                var paidDefenceCost = eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Recovery").Sum(x => x.PaymentDefenceCost) - eligiblePaymentsForReserve.Where(ap => ap.PaymentType == "Paid").Sum(x => x.PaymentDefenceCost);

                ar.PaidDamage = paidDamage;
                ar.PaidClaimantCost = paidClaimantCost;
                ar.PaidDefenceCost = paidDefenceCost;

            });

            var orderedApprovedReserves = approvedReserves.OrderBy(r => r.StatusDate);

            return Ok(orderedApprovedReserves);
        }



        [HttpPut("Payment/updateWithReserve/{id:Guid}")]
        public async Task<IActionResult> updatePaymentWithReserve([FromRoute] Guid id, PaymentModel paymentRequestFromUi)
        {

            var paymentRequest = await _insuranceClaimDBContext.PaymentModel.FindAsync(id);
            if (paymentRequest == null)
            {
                return NotFound();
            }

            var latestReserve =  _insuranceClaimDBContext.ReserveModel.Where(r => r.Status == "Approved").OrderByDescending(p => p.StatusDate).FirstOrDefault();

            if (latestReserve == null)
            {
                return NotFound();
            }

            if (paymentRequest.PaymentType == "Paid")
            {
                latestReserve.PaidDamage += paymentRequest.PaymentDamage;
                latestReserve.PaidClaimantCost += paymentRequest.PaymentClaimantCost;
                latestReserve.PaidDefenceCost += paymentRequest.PaymentDefenceCost;
            }else if (paymentRequest.PaymentType == "Recovery")
            {
                latestReserve.PaidDamage -= paymentRequest.PaymentDamage;
                latestReserve.PaidClaimantCost -= paymentRequest.PaymentClaimantCost;
                latestReserve.PaidDefenceCost -= paymentRequest.PaymentDefenceCost;
            }

            await _insuranceClaimDBContext.SaveChangesAsync();
            return Ok(latestReserve);
        }


    }
}



